import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { SECTION_07_IMAGE_URL } from '../nianzhong.data';
import { Router } from '@angular/router';

@Component({
  selector: 'section-07',
  templateUrl: 'section-07.component.html',
  styleUrls: ['section-07.component.scss']
})

export class Section07Component implements AfterViewInit {
  public imgUrl;

  @ViewChild('entry')
  public entryEl: ElementRef;
  @ViewChild('text')
  public textEl: ElementRef;
  @ViewChild('tips')
  public tipsEl: ElementRef;

  constructor(
    private router: Router,
  ) {
    this.imgUrl = SECTION_07_IMAGE_URL;
  }

  ngAfterViewInit() {
    this.textEl.nativeElement.addEventListener('webkitAnimationEnd', () => {
      this.entryEl.nativeElement.classList.add('magic-animation');
      this.tipsEl.nativeElement.classList.add('flash-animation');
      document.body.style.overflow = 'hidden';
    }, false);

    this.entryEl.nativeElement.addEventListener('click', () => {
      this.router.navigate(['/nianzhong/share']);
    }, false);
  }

}
