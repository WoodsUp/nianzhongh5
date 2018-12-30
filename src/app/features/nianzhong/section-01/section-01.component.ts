import { Component, AfterViewInit } from '@angular/core';

import { SECTION_01_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-01',
  templateUrl: 'section-01.component.html',
  styleUrls: ['section-01.component.scss']
})

export class Section01Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_01_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
