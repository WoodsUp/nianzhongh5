import { Component, AfterViewInit } from '@angular/core';

import { SECTION_06_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-06',
  templateUrl: 'section-06.component.html',
  styleUrls: ['section-06.component.scss']
})

export class Section06Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_06_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
