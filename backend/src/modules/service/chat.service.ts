import chatRepository from "../db/chat.repository";

const getChatsForUser = async (userId: string) => {
    return await chatRepository.getChatsForUser(userId);
};

const getOrCreateChat = async (listingId: number, userId: string) => {
    return await chatRepository.getOrCreateChat(listingId, userId);
};

const getMessagesForListing = async (listingId: number, userId: string) => {
    return await chatRepository.getMessagesForListing(listingId, userId);
};

const sendMessage = async (chatId: number, userId: string, message: string) => {
    return await chatRepository.sendMessage(chatId, userId, message);
};

export default {getChatsForUser, getOrCreateChat, getMessagesForListing, sendMessage};