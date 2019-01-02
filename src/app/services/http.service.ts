import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../model/Response';

@Injectable()
export class HttpService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Charset': 'UTF-8',
  });
  private options = {
    headers: this.headers,
    withCredentials: true,
  };

  private DEV_URL = 'https://vr.forwoodsup.cn/';
  private PC_URL = 'http://zxxtest.wecareroom.com/';

  constructor(
    private http: HttpClient,
  ) {}

  /* 接口
  _____________________________________________________________ */

  // 登录
  login(phone: number, password: number, rememberMe: boolean = false) {
    let url = this.PC_URL + 'api/login/doLogin';
    return this.createPostRequest(url, { phone, password, rememberMe });
  }

  // 获取用户登录信息
  getLoginStatus() {
    let url = this.PC_URL + 'api/login/getLoginStatus';
    return this.createGetRequest(url);
  }

  // VR账单数据
  getVRUserData(uid: number) {
    let url = this.PC_URL + 'api/admin/user/listYearEndRecordByUid';
    return this.createPostRequest(url, { uid });
  }

  /* 创建请求
  _____________________________________________________________ */
  private createGetRequest(url: string) {
    return this.http.get(url, this.options)
      .toPromise()
      .then(res => res as Result)
      .catch(this.handleError);
  }

  private createPostRequest(url: string, data?: object) {
    console.log(url);
    return this.http.post(url, JSON.stringify(data), this.options)
      .toPromise()
      .then(res => res as Result)
      .catch(this.handleError);
  }

  // 错误处理
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
