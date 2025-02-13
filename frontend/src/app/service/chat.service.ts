import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api'; // Change this to match your backend URL
  private activeChatId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  // Get the list of available chats
  getChatList(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/chats`);
  }

  // Get messages for a specific chat
  getMessages(chatId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/chats/${chatId}/messages`);
  }

  // Send a new message to a chat
  sendMessage(chatId: number, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chats/${chatId}/messages`, { message });
  }

  // Set active chat
  setActiveChat(chatId: number) {
    this.activeChatId.next(chatId);
  }

  // Get the active chat ID
  getActiveChatId(): Observable<number | null> {
    return this.activeChatId.asObservable();
  }
}
