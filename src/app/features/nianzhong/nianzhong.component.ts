import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'nian-zhong',
  templateUrl: 'nianzhong.component.html',
  styleUrls: ['nianzhong.component.scss']
})
export class NianZhongComponent implements OnInit, AfterViewInit {
  private isiOS;
  private imgCount;
  private alreadyLoaded;
  private imageElements;
  private DEVICE_WIDTH: number;
  private DEVICE_HEIGHT: number;

  constructor(
    private animation: AnimationService,
  ) {
  }

  ngOnInit() {
    this.isiOS = navigator.userAgent.includes('iPhone');

    this.DEVICE_WIDTH = window.innerWidth;
    this.DEVICE_HEIGHT = window.innerHeight;
  }

  ngAfterViewInit() {}
}
