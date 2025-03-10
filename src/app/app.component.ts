import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './utils/nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './utils/interceptors/JwtInterceptor';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LoginComponent],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'credit-application';
}
