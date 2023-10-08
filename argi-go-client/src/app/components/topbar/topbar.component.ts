import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  standalone: true,
  imports: [AppRoutingModule, MaterialModule, SidebarComponent],
  selector: 'argi-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in')),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  @Input()
  public isExpanded = false;

  @Input()
  public color: ThemePalette = 'primary';

  @Output()
  public toggleMenu = new EventEmitter<boolean>();

  public iconRotateState: string = 'default';

  constructor() {}

  ngOnInit(): void {}

  public expandedToggle() {
    this.isExpanded = !this.isExpanded;

    this.iconRotateState =
      this.iconRotateState === 'default' ? 'rotated' : 'default';
  }

  public itemClicked() {
    this.isExpanded = false;
  }
}
