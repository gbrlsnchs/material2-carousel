import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'mat-carousel-item',
  templateUrl: './mat-carousel-item.component.html',
  styleUrls: ['./mat-carousel-item.component.scss']
})
export class MatCarouselItemComponent implements OnInit {
  // Attributes.
  @Input()
  public backgroundImage: string;
  @Input()
  public outlineColor = '#00000040';

  // Elements.
  @ViewChild(TemplateRef)
  public templateRef: TemplateRef<any>;

  public ngOnInit(): void {
    if (this.backgroundImage) {
      this.backgroundImage = `url("${this.backgroundImage}")`;
    }
  }
}
