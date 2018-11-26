import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { MatCarouselSlide } from './carousel-slide';

@Component({
  selector: 'mat-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.scss']
})
export class MatCarouselSlideComponent implements MatCarouselSlide, OnInit {
  // Attributes.
  @Input()
  public backgroundImage: string;
  @Input()
  public overlayColor = '#00000040';
  @Input()
  public showOverlay = true;

  // Elements.
  @ViewChild(TemplateRef)
  public templateRef: TemplateRef<any>;

  public ngOnInit(): void {
    if (this.backgroundImage) {
      this.backgroundImage = `url("${this.backgroundImage}")`;
    }
  }
}
