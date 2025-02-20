// src/app/services/chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chat {
  id: number;
  listing_id: number;
  listing_title: string;
  listing_description?: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
}

export interface ChatMessage {
  id: number;
  chat_id: number;
  user_id: string;
  sender_id: string;
  message: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  /** Fetch all chats for the current user */
  getChatsForUser(): Observable<{ chats: Chat[] }> {
    return this.http.get<{ chats: Chat[] }>('/chat');
  }

  /** Fetch messages for a given listing */
  getMessagesForListing(listingId: number): Observable<{ messages: ChatMessage[] }> {
    return this.http.get<{ messages: ChatMessage[] }>(`/chat/${listingId}/messages`);
  }

  /** Send a new message to a chat for the given listing */
  sendMessage(listingId: number, message: string): Observable<any> {
    return this.http.post(`/chat/${listingId}/messages`, { message });
  }
}
