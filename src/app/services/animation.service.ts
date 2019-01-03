import * as $ from 'jquery';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {
  public DEVICE_H;
  public scrollDown = true;

  constructor() {
  }

  initAnimationItems() {
    this.DEVICE_H = window.innerHeight;

    $('.animated').each(function () {
      const $this = $(this);
      let aniDuration, aniDelay;

      $this.attr('data-origin-class', $this.attr('class'));

      aniDuration = $this.data('ani-duration');
      aniDelay = $this.data('ani-delay');

      $this.css({
        'visibility': 'hidden',
        'animation-duration': aniDuration,
        '-webkit-animation-duration': aniDuration,
        'animation-delay': aniDelay,
        '-webkit-animation-delay': aniDelay
      });
    });
  }

  play() {
    const _this = this;
    // this.clearAnimation();

    let aniItems = document.querySelectorAll('.animated');
    $(aniItems).each(function () {
      if (_this.inScreen(this)) {
        _this.doAnimation(this);
      }
    });
  }

  doAnimation(el) {
    let $el = $(el);
    $el.css({
      'visibility': 'visible'
    });
    let aniName = $el.data('ani-name');
    $el.addClass(aniName);
  }

  clearAnimation() {
    const _this = this;
    $('.animated').each(function () {
      const $this = $(this);
      $this.css({
        'visibility': 'hidden'
      });
      $this.attr('class', $this.data('origin-class'));
    });
  }

  /**
   * 获取元素在屏幕中的状态
   * @param {DOMElement} dom 原生DOM元素
   * @returns {Number} 0(屏幕上方), 1(上方离开屏幕), 2(屏幕中), 3(下方进入屏幕), 4(屏幕下方)
   */
  getPos(dom) {
    const _this = this;
    let boundingRect = dom.getBoundingClientRect();
    let viewTop = boundingRect.top;
    let viewBottom = boundingRect.bottom;
    let pos;

    if (viewBottom <= 0) {
      pos = 1;
    } else if (viewTop <= 0 && viewBottom > 0) {
      pos = 2;
    } else if (viewTop >= 0 && viewBottom < _this.DEVICE_H) {
      pos = 3;
    } else if (viewTop <= _this.DEVICE_H && viewBottom >= _this.DEVICE_H) {
      pos = 4;
    } else if (viewTop > _this.DEVICE_H) {
      pos = 5;
    }

    return pos;
  }

  inScreen(dom) {
    const _this = this;
    let boundingRect = dom.getBoundingClientRect();
    let viewTop = boundingRect.top;
    // let viewBottom = boundingRect.bottom;

    return viewTop < _this.DEVICE_H;
    // return viewTop >= 0 && viewTop < _this.DEVICE_H;
  }
}
