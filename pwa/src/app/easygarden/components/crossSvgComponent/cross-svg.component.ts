import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-svg',
  template: `
    <svg attr.width="{{width}}px" attr.height="{{height}}px" attr.fill="{{size}}">
      <use attr.xlink:href="assets/icons/{{icon}}.svg#{{icon}}"></use>
    </svg>
  `,
})
export class CrossSvgComponent implements OnInit {
  @Input() icon!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() size?: number = 24;

  ngOnInit(): void {
    if (!this.width || !this.height) {
      this.width = this.size;
      this.height = this.size;
    }
  }
}