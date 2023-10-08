import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IKotobaData } from 'src/app/models/IKotoba';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  kotoba: IKotobaData | null = null;
}
