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
      title: '收官! 查看你的年度VR零售全景图',
      desc: '2018，面对重重压力，你披荆斩棘，2019，你将继续蜕变，为更多的人铸梦空间',
      imgUrl: 'http://resources.wecareroom.com/assets/nianzhong/wx-share.jpg',

      titleMoments: '收官! 查看你的年度VR零售全景图',
      descMoments: '2018，面对重重压力，你披荆斩棘，2019，你将继续蜕变，为更多的人铸梦空间',
      imgUrlMoments: 'http://resources.wecareroom.com/assets/nianzhong/wx-share.jpg',
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
          if (document.readyState === 'complete') {
            setTimeout(this.closeLoading.bind(this), 500);
          } else {
            document.onreadystatechange = () => {
              if (document.readyState === 'complete') {
                setTimeout(this.closeLoading.bind(this), 500);
              }
            };
          }
        }
      };
    }
  }

  closeLoading() {
    this.fadeOut('.section-loading', () => {
      // document.body.style.overflow = 'auto';
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
