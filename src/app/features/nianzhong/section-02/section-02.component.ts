import { Component, AfterViewInit } from '@angular/core';

import { SECTION_02_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-02',
  templateUrl: 'section-02.component.html',
  styleUrls: ['section-02.component.scss']
})

export class Section02Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_02_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
