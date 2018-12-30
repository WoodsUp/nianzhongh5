import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'typing-box',
  templateUrl: 'typing-box.component.html',
  styleUrls: ['typing-box.component.scss']
})
export class TypingBoxComponent implements AfterViewInit {
  public showText: string;
  @ViewChild('boxRef')
  public boxRef: ElementRef;
  @ViewChild('boxRef')
  public flashRef: ElementRef;

  public nowLength: number = 0;
  public totalLength: number;

  @Input()
  private text: string;
  @Input()
  private ms: number = 150;
  @Input()
  private delay: number = 500;

  ngAfterViewInit() {
    // if (this.delay === undefined) {
    //   this.delay = 500;
    // }
    this.boxRef.nativeElement.setAttribute('data-ani-delay', this.delay + 'ms');
  }

  // play
  play() {
    this.typingAnimate();
  }

  // 打字机动画
  typingAnimate() {
    this.totalLength = this.text.length;

    this.showText = '';
    let timer = setInterval(() => {
      if (this.nowLength >= this.totalLength) {
        clearInterval(timer);
      } else {
        this.showText += this.text[this.nowLength];
        this.nowLength++;
      }
    }, this.ms);
  }
}
