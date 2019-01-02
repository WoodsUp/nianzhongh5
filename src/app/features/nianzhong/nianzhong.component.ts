import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as AlloyTouch from 'alloytouch';
import * as Transform from 'css3transform/dist/css3transform.js';

import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'nian-zhong',
  templateUrl: 'nianzhong.component.html',
  styleUrls: ['nianzhong.component.scss']
})
export class NianZhongComponent implements OnInit, AfterViewInit {
  public isPaused: boolean;

  @ViewChild('music')
  private musicBtn: ElementRef;
  @ViewChild('icon')
  private icon: ElementRef;

  constructor(
    private animation: AnimationService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.toggleMusic(true);

    const _animation = this.animation;
    // 滚动
    const scroller = document.body.querySelector('.h5-container');
    Transform(scroller);
    document.onreadystatechange = (e) => {
      let isReady = document.readyState === 'complete';
      if (isReady) {
        let min = window.innerHeight - $('.h5-container').height();
        const scrollWrapper = new AlloyTouch({
          touch: scroller,
          target: scroller,
          property: 'translateY',
          max: 0,
          min: min,
          moveFactor: 0.3,
          maxSpeed: 0.8,
          factor: 0.3,
          step: 1,
          bindSelf: false,
          change() {
            _animation.play();
          },
        });
      }
    };
  }

  toggleMusic(status?: boolean) {
    if (status === undefined) {
      this.isPaused = !this.isPaused;
    } else {
      this.isPaused = status;
    }

    let el = this.musicBtn.nativeElement;
    let icon = this.icon.nativeElement;
    if (this.isPaused) {
      el.play();
      icon.classList.remove('pause');
    } else {
      el.pause();
      icon.classList.add('pause');
    }
  }
}
