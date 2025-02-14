import { Router } from "express";
import authService from "../service/auth.service";
import chatService from "../service/chat.service";

const chatRouter = Router();

chatRouter.get("/", authService.isAuthenticated, async (req, res) => {
    console.log("GET /chat - Fetching chats for user");
    try {
        const userId = req.session.userID;
        if (!userId) {
            console.log("GET /chat - No userID found in session");
            return;
        }
        console.log(`GET /chat - Fetching chats for userID: ${userId}`);

        const chats = await chatService.getChatsForUser(userId);
        console.log(`GET /chat - Successfully retrieved ${chats.length} chats`);
        res.json({ chats });
    } catch (error) {
        console.error("GET /chat - Error fetching chats:", error);
        res.status(500).json({ error: "Failed to fetch chats." });
    }
});

chatRouter.get("/:listing_id/messages", authService.isAuthenticated, async (req, res) => {
    console.log("GET /chat/:listing_id/messages - Fetching messages for listing");
    try {
        const listingId = parseInt(req.params.listing_id, 10);
        if (isNaN(listingId)) {
            console.log(`GET /chat/:listing_id/messages - Invalid listing ID: ${req.params.listing_id}`);
            return;
        }

        const userId = req.session.userID;
        if (!userId) {
            console.log("GET /chat/:listing_id/messages - No userID found in session");
            return;
        }

        console.log(`GET /chat/:listing_id/messages - Fetching messages for listing ${listingId} and user ${userId}`);
        const messages = await chatService.getMessagesForListing(listingId, userId);
        console.log(`GET /chat/:listing_id/messages - Successfully retrieved ${messages.length} messages`);
        res.json({ messages });
    } catch (error) {
        console.error("GET /chat/:listing_id/messages - Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages." });
    }
});

chatRouter.post("/:listing_id/messages", authService.isAuthenticated, async (req, res) => {
    console.log("POST /chat/:listing_id/messages - Sending new message");
    try {
        const listingId = parseInt(req.params.listing_id, 10);
        if (isNaN(listingId)) {
            console.log(`POST /chat/:listing_id/messages - Invalid listing ID: ${req.params.listing_id}`);
            return;
        }

        const userId = req.session.userID;
        if (!userId) {
            console.log("POST /chat/:listing_id/messages - No userID found in session");
            return;
        }

        const { message } = req.body;
        if (!message || message.trim().length === 0) {
            console.log("POST /chat/:listing_id/messages - Empty or invalid message");
            return;
        }

        console.log(`POST /chat/:listing_id/messages - Getting/creating chat for listing ${listingId} and user ${userId}`);
        const chat = await chatService.getOrCreateChat(listingId, userId);
        console.log(`POST /chat/:listing_id/messages - Chat ID: ${chat.id}`);

        console.log("POST /chat/:listing_id/messages - Sending message");
        const newMessage = await chatService.sendMessage(chat.id, userId, message);
        console.log(`POST /chat/:listing_id/messages - Message sent successfully, ID: ${newMessage.id}`);

        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error("POST /chat/:listing_id/messages - Error sending message:", error);
        res.status(500).json({ error: "Failed to send message." });
    }
});

export default chatRouter;