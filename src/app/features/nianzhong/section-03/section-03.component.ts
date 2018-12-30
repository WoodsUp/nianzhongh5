import { Component, AfterViewInit } from '@angular/core';

import { SECTION_03_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-03',
  templateUrl: 'section-03.component.html',
  styleUrls: ['section-03.component.scss']
})

export class Section03Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_03_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
