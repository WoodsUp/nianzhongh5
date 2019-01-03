import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nian-zhong',
  templateUrl: 'nianzhong.component.html',
  styleUrls: ['nianzhong.component.scss']
})
export class NianZhongComponent implements AfterViewInit {
  public isPaused: boolean;

  @ViewChild('music')
  private musicBtn: ElementRef;
  @ViewChild('icon')
  private icon: ElementRef;

  ngAfterViewInit() {
    this.toggleMusic(true);

    const wx = (window as any).wx;
    if (wx.invoke) {
      wx.invoke('getNetworkType', {}, () => {
        this.toggleMusic(true);
      }, false);
    } else {
      wx.ready(() => {
        wx.invoke('getNetworkType', {}, () => {
          this.toggleMusic(true);
        }, false);
      });
    }
  }

  toggleMusic(status?: boolean) {
    if (status === undefined) {
      this.isPaused = !this.isPaused;
    } else {
      this.isPaused = status;
    }

    let el = this.musicBtn.nativeElement;
    let icon = this.icon.nativeElement;
    if (this.isPaused) {
      el.play();
      icon.classList.remove('pause');
    } else {
      el.pause();
      icon.classList.add('pause');
    }
  }
}
