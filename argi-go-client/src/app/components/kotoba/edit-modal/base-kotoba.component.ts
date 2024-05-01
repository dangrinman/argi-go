import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export abstract class BaseKotobaComponent {
  constructor(private announcer: LiveAnnouncer) {}
  translations: string[] = [];
  keywords: string[] = [];

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addTranslation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.translations.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTranslation(keyword: string) {
    const index = this.translations.indexOf(keyword);
    if (index >= 0) {
      this.translations.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }
}
