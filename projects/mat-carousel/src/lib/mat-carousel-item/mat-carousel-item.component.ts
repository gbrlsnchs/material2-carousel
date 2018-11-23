import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { MatCarouselItem } from './mat-carousel-item';

@Component({
  selector: 'mat-carousel-item',
  templateUrl: './mat-carousel-item.component.html',
  styleUrls: ['./mat-carousel-item.component.scss']
})
export class MatCarouselItemComponent implements MatCarouselItem, OnInit {
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
