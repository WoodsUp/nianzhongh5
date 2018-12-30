import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AnimationService } from '../../services/animation.service';
import { HttpService } from '../../services/http.service';
import { Sha1 } from '../../services/sha1';
import { WxShareService } from '../../services/wxShare.service';

import { LoadingPageComponent } from './loading-page/loading-page.component';
import { Section01Component } from './section-01/section-01.component';
import { Section02Component } from './section-02/section-02.component';
import { Section03Component } from './section-03/section-03.component';
import { Section04Component } from './section-04/section-04.component';
import { Section05Component } from './section-05/section-05.component';
import { Section06Component } from './section-06/section-06.component';
import { Section07Component } from './section-07/section-07.component';
import { SharePageComponent } from './share-page/share-page.component';

import { TypingBoxComponent } from '../common/typing-box/typing-box.component';
import { WxWebService } from '../../services/wx.web.service';
import { Http } from '@angular/http';


const MODULES = [
  FormsModule,
  BrowserModule,
];

const PIPES = [];

const COMPONENTS = [
  LoadingPageComponent,
  Section01Component,
  Section02Component,
  Section03Component,
  Section04Component,
  Section05Component,
  Section06Component,
  Section07Component,
  SharePageComponent,

  TypingBoxComponent,
];

const PROVIDERS = [
  AnimationService,
  HttpService,
  Sha1,
  WxWebService,
  WxShareService,
  Http,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  providers: [
    ...PROVIDERS,
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
  ],
})
export class NianZhongModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NianZhongModule,
      providers: [ ...PROVIDERS ],
    };
  }
}
