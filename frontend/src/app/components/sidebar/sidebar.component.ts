import { Component, Input } from '@angular/core';
import { ChatService } from '../../service/chat.service';  // Adjust the import path as needed
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() price!: number;
  @Input() seller_name!: string;
  @Input() address!: string;
  @Input() id!: number;

  constructor(private Router: Router, private chatService: ChatService) {}

  onMessageClick(): void {
    console.log(this.id);

    this.chatService.sendMessage(this.id, 'I wanted to ask if this is still available?').subscribe({
      next: (response) => {
        this.Router.navigateByUrl('/chat');
        console.log('Message sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending message', error);
      }
    });
  }
}
