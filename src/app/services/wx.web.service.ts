import { URLAPI } from '../model/URLAPI';
import { Headers, Http } from '@angular/http';
import { Result } from '../model/Response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class WxWebService {
  public url: string = URLAPI;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient
  ) {}
  getWXTicket(): Promise<Result> {
    return this.http.get(this.url + 'wxweb/getFuwuTicket')
      .toPromise()
      .then(response => response as Result)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
