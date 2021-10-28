import { fadeInOut } from '@shared/animations/component-animations'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-frame',
  templateUrl: './nav-frame.component.html',
  styleUrls: ['./nav-frame.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class NavFrameComponent implements OnInit {
  fullNavOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openFullNav = () => {
    this.fullNavOpen = true;
  }

  closeFullNav = () => {
    this.fullNavOpen = false;
  }

}
