import { Injectable } from '@angular/core';
import { WxWebService } from './wx.web.service';
import { Sha1 } from './sha1';

interface WxConfigData {
  // 分享给朋友
  title: string;
  desc: string;
  imgUrl: string;
  link: string;
  // 分享到朋友圈
  titleMoments: string;
  descMoments: string;
  imgUrlMoments: string;
  linkMoments: string;
}

@Injectable()
export class WxShareService {
  constructor(
    private wxWebService: WxWebService,
    private sha1: Sha1,
  ) {}

  setWxShare(config: WxConfigData) {
    this.wxWebService.getWXTicket()
      .then(res => {
        if (res.status.error === 0) {
          let shareLink = document.location.href;

          let ticket = res.result;
          let timestamp = Number.parseInt((new Date()).getTime().toString().substr(0, 10));
          let nonceStr = this.getRandomStr();

          const wx = (window as any).wx;

          wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            debug: false,
            // 必填，公众号的唯一标识
            appId: 'wx5e9d71771d728a67',
            // 必填，生成签名的时间戳
            timestamp: timestamp,
            // 必填，生成签名的随机串
            nonceStr: nonceStr + '',
            // 必填，签名，见附录1
            signature: this.getSignature(ticket, timestamp, nonceStr) + '',
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareQZone'
            ]
          });

          wx.ready(() => {
            // 朋友圈
            wx.onMenuShareTimeline({
              title: config.titleMoments, // 分享标题
              link: config.linkMoments, // 分享链接
              desc: config.descMoments, // 分享描述
              imgUrl: config.imgUrlMoments, // 分享图标
              success: () => {},
              cancel: () => {}
            });
            wx.onMenuShareAppMessage({
              // 微信群
              title: config.title,
              desc: config.desc,
              link: config.link,
              imgUrl: config.imgUrl,
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: () => {},
              cancel: () => {}
            });
          });

        }
    });
  }

  getRandomStr() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  getSignature(wxticket, timestamp, nonceStr) {
    let str = 'jsapi_ticket=' + wxticket +
      '&noncestr=' + nonceStr +
      '&timestamp=' + timestamp +
      '&url=' + location.href.split('#')[0];
    return this.sha1.Sha1(str);
  }

}
