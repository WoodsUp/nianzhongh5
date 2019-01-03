import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as $ from 'jquery';
import * as AlloyTouch from 'alloytouch';
import * as Transform from 'css3transform/dist/css3transform.js';

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
    // 加载页面
    this.wxShare.setWxShare({
      title: '收官! 查看你的年度VR零售全景图',
      desc: '2018，面对重重压力，你披荆斩棘，2019，你将继续蜕变，为更多的人铸梦空间',
      imgUrl: 'http://resources.wecareroom.com/assets/nianzhong/wx-share.jpg',
      link: 'http://zxxtest.wecareroom.com/test',

      titleMoments: '收官! 查看你的年度VR零售全景图',
      descMoments: '2018，面对重重压力，你披荆斩棘，2019，你将继续蜕变，为更多的人铸梦空间',
      imgUrlMoments: 'http://resources.wecareroom.com/assets/nianzhong/wx-share.jpg',
      linkMoments: 'http://zxxtest.wecareroom.com/test',
    });

    document.body.style.overflow = 'hidden';
    // 禁止触摸事件
    document.body.addEventListener('touchmove', this.lockTouch);
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
      };
    }
    // 关闭加载页面
    window.addEventListener('load', () => {
      setTimeout(this.closeLoading.bind(this), 500);
    });
  }

  closeLoading() {
    this.fadeOut('.section-loading', () => {
      document.removeEventListener('touchmove', this.lockTouch);
      const _animation = this.animation;
      _animation.play();
      // 滚动
      const scroller = document.body.querySelector('.h5-container');
      Transform(scroller);

      const scrollerWrapper =  new AlloyTouch({
        touch: scroller,
        target: scroller,
        property: 'translateY',
        max: 0,
        min: window.innerHeight - $('.h5-container').height(),
        moveFactor: 0.3,
        maxSpeed: 0.8,
        factor: 0.3,
        step: 1,
        bindSelf: false,
        change() {
          _animation.play();
        },
      });

      scrollerWrapper.to(window.innerHeight - $('.h5-container').height(), 120000, x => x);
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

  private lockTouch(e) {
    e.preventDefault();
    e.returnValue = false;
    e.stopPropagation();
    e.cancelBubble = true;
    return false;
  }
}
