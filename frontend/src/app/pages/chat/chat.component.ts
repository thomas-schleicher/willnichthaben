// src/app/pages/chat/chat.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Chat, ChatMessage } from '../../service/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chats: Chat[] = [];
  selectedChat: Chat | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  loadingChats = false;
  loadingMessages = false;
  sendingMessage = false;
  error = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.fetchChats();
  }

  fetchChats(): void {
    this.loadingChats = true;
    this.chatService.getChatsForUser().subscribe({
      next: (data) => {
        this.chats = data.chats;
        this.loadingChats = false;
      },
      error: (err) => {
        console.error('Error fetching chats', err);
        this.error = 'Failed to load chats.';
        this.loadingChats = false;
      }
    });
  }

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    this.fetchMessages(chat.listing_id);
  }

  fetchMessages(listingId: number): void {
    this.loadingMessages = true;
    this.chatService.getMessagesForListing(listingId).subscribe({
      next: (data) => {
        this.messages = data.messages;
        this.loadingMessages = false;
      },
      error: (err) => {
        console.error('Error fetching messages', err);
        this.error = 'Failed to load messages.';
        this.loadingMessages = false;
      }
    });
  }

  sendMessage(): void {
    if (!this.selectedChat || !this.newMessage.trim()) return;
    this.sendingMessage = true;
    this.chatService.sendMessage(this.selectedChat.listing_id, this.newMessage).subscribe({
      next: (data: any) => {
        if (data?.message) {
          this.messages.push(data.message);
        }
        this.newMessage = '';
        this.sendingMessage = false;
      },
      error: (err) => {
        console.error('Error sending message', err);
        this.error = 'Failed to send message.';
        this.sendingMessage = false;
      }
    });
  }

  debugCreateChat(): void {
    this.chatService.sendMessage(2, 'DEBUG: Create chat')
        .subscribe({
          next: (data: any) => {
            console.log('Debug chat created:', data);
            this.fetchChats();
          },
          error: (err) => {
            console.error('Error creating debug chat', err);
            this.error = 'Failed to create debug chat.';
          }
        });
  }
}
