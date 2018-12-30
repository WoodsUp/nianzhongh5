import { Component, AfterViewInit } from '@angular/core';

import { LOADING_IMAGE_URL } from '../nianzhong.data';
import { AnimationService } from '../../../services/animation.service';
import { WxShareService } from '../../../services/wxShare.service';

@Component({
  selector: 'loading-page',
  templateUrl: 'loading-page.component.html',
  styleUrls: ['loading-page.component.scss']
})

export class LoadingPageComponent implements AfterViewInit {
  public imgUrl;
  public isloading: boolean;
  public loadingPercent: number = 0;

  public showMask: boolean = false;

  private imgCount: number;
  private alreadyLoaded: number;
  private imageElements;

  constructor(
    private animation: AnimationService,
    private wxShare: WxShareService,
  ) {
    this.imgUrl = LOADING_IMAGE_URL;
  }

  ngAfterViewInit() {
    this.wxShare.setWxShare({
      title: '您的 2018 VR 账单',
      desc: '有一份您的VR账单等待签收',
      imgUrl: '',
    });

    document.body.style.overflow = 'hidden';
    // 计算图片总数
    this.imageElements = document.getElementsByTagName('img');
    this.imgCount = this.imageElements.length;

    // 初始化动画
    this.animation.initAnimationItems();

    this.alreadyLoaded = 0;
    for (let el of this.imageElements) {
      if (el.nodeType !== 1) { continue; }
      el.onload = () => {
        this.alreadyLoaded++;
        this.loadingPercent = Math.round((this.alreadyLoaded / this.imgCount) * 100);
        if (this.alreadyLoaded >= this.imgCount) {
          // 关闭加载页面
          setTimeout(this.closeLoading.bind(this), 500);
        }
      };
    }
  }

  closeLoading() {
    this.fadeOut('.section-loading', () => {
      document.body.style.overflow = 'auto';
      this.animation.play();
    });
  }


  fadeOut(selector, callback?) {
    const el = document.querySelector(selector);
    el.classList.add('animated');
    el.style.animationName = el.getAttribute('data-ani-name');
    el.style.animationDuration = el.getAttribute('data-ani-duration');
    el.style.animationDelay = el.getAttribute('data-ani-delay');
    el.addEventListener('webkitAnimationEnd', () => {
      el.style.display = 'none';
      if (typeof callback === 'function') {
        callback(el);
      }
    }, false);
    this.animation.doAnimation(el);
  }
}
