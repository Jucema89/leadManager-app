import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/leads.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() user: User | undefined;
  @Output() emitRemove: EventEmitter<string> = new EventEmitter<string>()
  
}