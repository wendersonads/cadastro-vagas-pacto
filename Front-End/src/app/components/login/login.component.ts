import { Component, ViewEncapsulation } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FloatLabelModule],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  constructor(){}
}
