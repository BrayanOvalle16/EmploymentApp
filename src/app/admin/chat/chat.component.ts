import { Component } from '@angular/core';
import { ServiceCreditApplicationService } from '../../service/service-credit-application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  chatId = '123'; // puedes cambiarlo dinámicamente si lo deseas
  message = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  constructor(private chatService: ServiceCreditApplicationService) {}

  sendMessage() {
    if (!this.message.trim()) return;

    const userMessage = this.message;
    this.messages.push({ from: 'user', text: userMessage });

    this.chatService.sendMessage(this.chatId, userMessage).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.response });
      },
      error: (err) => {
        this.messages.push({ from: 'bot', text: 'Error al comunicarse con el servidor' });
      }
    });

    this.message = '';
  }
}