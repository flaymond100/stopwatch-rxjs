import { Component, Input } from "@angular/core";

@Component({
  selector: "welcome",
  template: `
    <h1>{{ name }}</h1>
  `,
  styles: [
    `
      h1 {
        font-family: Georgia, serif;
      }
    `
  ]
})
export class HelloComponent {
  @Input() name: string;
}
