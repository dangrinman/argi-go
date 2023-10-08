import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { IMenu } from 'src/app/models/Interfaces/IMenu';
import { listMenu } from 'src/assets/menu';

@Component({
  standalone: true,
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  selector: 'argi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @Input()
  public isExpanded = true;

  @Output() expandedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public showSubmenu: boolean = false;

  @Input()
  public isShowing = false;

  @Input()
  public menuList: IMenu[] = listMenu;

  constructor() {}

  public toggleMenu() {
    this.sidenav.toggle();
  }

  public expandedtoggle() {
    this.expandedEvent.emit();
  }

  ngOnInit(): void {}
}
