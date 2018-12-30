import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import {
  SECTION_08_IMAGE_URL
} from '../nianzhong.data';
import {
  VRUserData
} from '../../../model/VRUserData';
import {
  HttpService
} from '../../../services/http.service';
import {
  AnimationService
} from '../../../services/animation.service';
import {
  Sha1
} from '../../../services/sha1';
import {
  WxShareService
} from '../../../services/wxShare.service';



@Component({
  selector: 'share-page',
  templateUrl: 'share-page.component.html',
  styleUrls: ['share-page.component.scss']
})

export class SharePageComponent implements OnInit, AfterViewInit {
  public imgUrl;

  public account: string;
  public accountError: boolean = false;
  public password: string;
  public passwordError: boolean = false;
  public errMsg: string = '';
  public pass: boolean;

  public showMask: boolean = false;

  public createTimeParse = {
    year: 2017,
    month: 9,
    date: 18,
  };
  private data: VRUserData;

  constructor(
    private httpService: HttpService,
    private animation: AnimationService,
    private sha1: Sha1,
    private wxShare: WxShareService,
  ) {
    this.imgUrl = SECTION_08_IMAGE_URL;

    this.data = {
      shareCount: 0,
      product: {
        name: '',
      },
      sceneCount: 0,
      collectionCount: 0,
      startTime: 0,
      endTime: 0,
      productCount: 0,
      scene: {
        name: '',
      }
    };
  }

  ngOnInit() {
    this.wxShare.setWxShare({
      title: '您的 2018 VR 账单',
      desc: '有一份您的VR账单等待签收',
      imgUrl: '',
    });
  }

  ngAfterViewInit() {
    this.animation.initAnimationItems();

    // 表单验证
    const accountEl = document.getElementsByName('account')[0];
    accountEl.addEventListener('blur', () => {
      if (!this.account) {
        this.accountError = true;
      } else {
        this.accountError = false;
      }
    }, false);
    accountEl.addEventListener('input', () => {
      if (!this.account) {
        this.accountError = true;
      } else {
        this.accountError = false;
        this.errMsg = '';
      }
    }, false);

    const passwordEl = document.getElementsByName('password')[0];
    passwordEl.addEventListener('blur', () => {
      if (!this.password) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    }, false);
    passwordEl.addEventListener('input', () => {
      if (!this.password) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
        this.errMsg = '';
      }
    }, false);
  }

  login() {
    // this.closeLogin(); return;
    this.pass = !!this.account && !!this.password;
    // 验证信息是否为空
    if (!this.account) {
      this.accountError = true;
    } else {
      this.accountError = false;
    }
    if (!this.password) {
      this.passwordError = true;
    }
    if (!this.pass) {
      return this.errMsg = '账号和密码均不能为空';
    }
    // 登录
    this.httpService.login(Number(this.account), this.sha1.Sha1(Number(this.password)))
      .then(res => {
        if (res.status.error === 0) {
          this.errMsg = '登录成功';
          this.accountError = false;
          this.passwordError = false;

          this.httpService.getLoginStatus().then(_res => {
            if (_res.status.error === 0) {
              let createTime = _res.result.create_time;
              this.createTimeParse.year = createTime.split('-')[0];
              this.createTimeParse.month = createTime.split('-')[1];
              this.createTimeParse.date = createTime.split('-')[2];
              // 获取用户 uid
              let uid = _res.result.id;
              this.httpService.getVRUserData(uid).then(_response => {
                if (_response.status.error === 0) {
                  this.data = _response.result;
                  // 展示数据
                  setTimeout(this.closeLogin.bind(this), 500);
                }
              });
            }
          });
        } else {
          this.errMsg = '请输入正确的账号密码';
          this.accountError = true;
          this.passwordError = true;
        }
      }).catch(err => {
        this.errMsg = '请求错误';
        this.accountError = true;
        this.passwordError = true;
      });
  }

  closeLogin() {
    this.fadeOut('.login', () => {
      this.animation.play();
    });
  }

  fadeOut(selector, callback ? ) {
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

  toggleMask() {
    this.showMask = !this.showMask;
  }
}
