import db from '../config/postgres.config';

const getChatsForUser = async (userId: string) => {
    const query = `
        select * from chats 
        where user1_id = $1 or user2_id = $1
        order by created_at desc;
    `;
    const { rows } = await db.query(query, [userId]);
    return rows;
};

const getOrCreateChat = async (listingId: number, userId: string) => {
    const checkQuery = `
        select * from chats 
        where listing_id = $1 and (user1_id = $2 or user2_id = $2);
    `;
    const { rows } = await db.query(checkQuery, [listingId, userId]);
    if (rows.length > 0) return rows[0];

    const ownerQuery = `select seller_id from listings where id = $1;`;
    const ownerResult = await db.query(ownerQuery, [listingId]);

    if (ownerResult.rows.length === 0) {
        throw new Error("Listing not found.");
    }

    const ownerId = ownerResult.rows[0].user_id;
    if (ownerId === userId) {
        throw new Error("Cannot start a chat with yourself.");
    }

    const insertQuery = `
        insert into chats (listing_id, user1_id, user2_id)
        values ($1, $2, $3)
        returning *;
    `;
    const { rows: newChatRows } = await db.query(insertQuery, [listingId, userId, ownerId]);
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
    const { rows } = await db.query(query, [chatId]);
    return rows;
};

const sendMessage = async (chatId: number, userId: string, message: string) => {
    const insertQuery = `
        insert into chat_messages (chat_id, user_id, message) 
        values ($1, $2, $3)
        returning *;
    `;
    const { rows } = await db.query(insertQuery, [chatId, userId, message]);
    return rows[0];
};

export default { getChatsForUser, getOrCreateChat, getMessagesForListing, sendMessage };
