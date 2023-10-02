import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GuessWordsComponent } from '../guess-words/guess-words.component';

@Component({
  selector: 'app-guess-kotoba',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GuessWordsComponent],
  templateUrl: './guess-kotoba.component.html',
  styleUrls: ['./guess-kotoba.component.scss'],
})
export class GuessKotobaComponent {}
