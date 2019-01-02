/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { NianZhongComponent } from './features/nianzhong/nianzhong.component';
import { SharePageComponent } from './features/nianzhong/share-page/share-page.component';

export const routes: Routes = [
  {
    path: 'test',
    component: NianZhongComponent,
  },
  {
    path: 'share',
    component: SharePageComponent,
  },
  {
    path: '**',
    component: NotFound404Component
  },
];
