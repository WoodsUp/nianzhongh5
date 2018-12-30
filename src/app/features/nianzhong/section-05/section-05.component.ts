import { Component, AfterViewInit } from '@angular/core';

import { SECTION_05_IMAGE_URL } from '../nianzhong.data';

@Component({
  selector: 'section-05',
  templateUrl: 'section-05.component.html',
  styleUrls: ['section-05.component.scss']
})

export class Section05Component implements AfterViewInit {
  public imgUrl;

  constructor() {
    this.imgUrl = SECTION_05_IMAGE_URL;
  }

  ngAfterViewInit() {}

}
