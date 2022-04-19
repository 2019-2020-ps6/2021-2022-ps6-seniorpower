import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starter-quiz';
  constructor() {
    document.documentElement.style.setProperty(`--font-size`, 22 + 'px');
  }
}
