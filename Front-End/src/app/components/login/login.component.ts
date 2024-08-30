import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public loading: boolean = false;
  constructor(){}

  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
