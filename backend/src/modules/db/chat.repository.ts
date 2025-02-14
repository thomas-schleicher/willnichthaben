import db from '../config/postgres.config';

const getChatsForUser = async (userId: string) => {
    const query = `
        SELECT c.*, l.title as listing_title, l.description as listing_description
        FROM chats c
                 JOIN listings l ON l.id = c.listing_id
        WHERE c.user1_id = $1 OR c.user2_id = $1
        ORDER BY c.created_at DESC;
    `;
    const {rows} = await db.query(query, [userId]);
    return rows;
};

const getOrCreateChat = async (listingId: number, userId: string) => {
    const checkQuery = `
        SELECT c.*, l.title as listing_title, l.description as listing_description
        FROM chats c
        JOIN listings l ON l.id = c.listing_id
        WHERE c.listing_id = $1
          AND (c.user1_id = $2 OR c.user2_id = $2);
    `;
    const {rows} = await db.query(checkQuery, [listingId, userId]);
    if (rows.length > 0) return rows[0];

    const ownerQuery = `
        SELECT seller_id, title, description
        FROM listings
        WHERE id = $1;
    `;
    const ownerResult = await db.query(ownerQuery, [listingId]);

    if (ownerResult.rows.length === 0) {
        throw new Error("Listing not found.");
    }

    const { seller_id: ownerId, title, description } = ownerResult.rows[0];
    if (ownerId === userId) {
        throw new Error("Cannot start a chat with yourself.");
    }

    // assure canonical order, to prevent duplicates
    const [user1, user2] =
        userId < ownerId ? [userId, ownerId] : [ownerId, userId];

    const insertQuery = `
        WITH inserted_chat AS (
            INSERT INTO chats (listing_id, user1_id, user2_id)
            VALUES ($1, $2, $3)
            RETURNING *
        )
        SELECT ic.*, l.title as listing_title, l.description as listing_description
        FROM inserted_chat ic
        JOIN listings l ON l.id = ic.listing_id;
    `;
    const {rows: newChatRows} = await db.query(insertQuery, [listingId, user1, user2]);
    return newChatRows[0];
};

const getMessagesForListing = async (listingId: number, userId: string) => {
    const chat = await getOrCreateChat(listingId, userId);
    return await getMessagesForChat(chat.id);
};

const getMessagesForChat = async (chatId: number) => {
    const query = `
        select *
        from chat_messages
        where chat_id = $1
        order by created_at;
    `;
    const {rows} = await db.query(query, [chatId]);
    return rows;
};

const sendMessage = async (chatId: number, userId: string, message: string) => {
    const insertQuery = `
        insert into chat_messages (chat_id, user_id, message)
        values ($1, $2, $3)
        returning *;
    `;
    const {rows} = await db.query(insertQuery, [chatId, userId, message]);
    return rows[0];
};

export default {getChatsForUser, getOrCreateChat, getMessagesForListing, sendMessage};
