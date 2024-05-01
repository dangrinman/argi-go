import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IKeiKotoba } from 'src/app/models/IKotoba';

@Component({
  selector: 'argi-kei-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kei-card.component.html',
  styleUrls: ['./kei-card.component.scss'],
})
export class KeiCardComponent {
  @Input()
  kotoba: IKeiKotoba | null = null;
}
