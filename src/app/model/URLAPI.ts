import {UrlChange} from './BaseUrl';

// export const URLAPI = 'http://dashboard.wecareroom.com/api/';
// export const URLAPI = 'http://zxxtest.wecareroom.com/api/';
// export const URLAPI = 'http://flooringtest.wecareroom.com/api/';
// export const URLAPI = 'http://kentest.wecareroom.com/api/';
// export const URLAPI = 'http://doortest.forwoodsup.cn/api/';
export const URLAPI = new UrlChange().getHost() + '/api/';
  // 'http://dashboard.forwoodsup.cn/api/';
export const URL = 'http://doortest.forwoodsup.cn/';
