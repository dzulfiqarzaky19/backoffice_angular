import { Component, input, computed } from '@angular/core';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'body-lg'
  | 'caption'
  | 'label'
  | 'error'
  | 'small'
  | 'highlight';

@Component({
  selector: 'app-typography',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './typography.component.css',
  host: {
    '[class]': 'variantClass()',
    '[style.color]': 'color()',
    '[style.fontSize]': 'fontSize()',
  },
})
export class TypographyComponent {
  variant = input<TypographyVariant>('body');
  color = input<string>();
  fontSize = input<string>();

  variantClass = computed(() => `typography-${this.variant()}`);
}
