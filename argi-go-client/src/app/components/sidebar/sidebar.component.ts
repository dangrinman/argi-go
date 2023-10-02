// import { Component, Input, OnInit } from '@angular/core';
// import { MatDrawerMode } from '@angular/material/sidenav';

// @Component({
//   selector: 'argi-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss'],
// })
// export class SidebarComponent implements OnInit {
//   @Input()
//   sidenavMode: MatDrawerMode = 'side';

//   @Input()
//   expanded: string = 'true';

//   @Input()
//   opened: boolean = true;

//   constructor() {}

//   ngOnInit(): void {}
// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @Input()
  public showSubmenu: boolean = false;

  @Input()
  public isShowing = false;

  @Input()
  public showSubSubMenu: boolean = false;
  public menuList: IMenu[] = listMenu;

  constructor() {}

  public toggleMenu() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {}
}
