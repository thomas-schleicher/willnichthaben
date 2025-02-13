import { Router } from "express";
import authService from "../service/auth.service";
import chatService from "../service/chat.service";

const chatRouter = Router();

chatRouter.get("/", authService.isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userID;
        if (!userId) {
            return;
        }

        const chats = await chatService.getChatsForUser(userId);
        res.json({ chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch chats." });
    }
});

chatRouter.get("/:listing_id/messages", authService.isAuthenticated, async (req, res) => {
    try {
        const listingId = parseInt(req.params.listing_id, 10);
        if (isNaN(listingId)) {
            return;
        }

        const userId = req.session.userID;
        if (!userId) {
            return;
        }

        const messages = await chatService.getMessagesForListing(listingId, userId);
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch messages." });
    }
});

chatRouter.post("/:listing_id/messages", authService.isAuthenticated, async (req, res) => {
    try {
        const listingId = parseInt(req.params.listing_id, 10);
        if (isNaN(listingId)) {
            return;
        }

        const userId = req.session.userID;
        if (!userId) {
            return;
        }

        const { message } = req.body;
        if (!message || message.trim().length === 0) {
            return;
        }

        const chat = await chatService.getOrCreateChat(listingId, userId);

        const newMessage = await chatService.sendMessage(chat.id, userId, message);

        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send message." });
    }
});

export default chatRouter;
