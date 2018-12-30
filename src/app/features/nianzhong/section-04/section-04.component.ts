import { Component, AfterViewInit } from '@angular/core';

import { SECTION_04_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-04',
  templateUrl: 'section-04.component.html',
  styleUrls: ['section-04.component.scss']
})

export class Section04Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_04_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
