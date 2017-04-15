import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ng2-slimscroll';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  opts: ISlimScrollOptions;

  constructor() { }

  ngOnInit() {
     this.opts = {
      position: 'right',
      barBackground: '#000000',

    }
  }

}
