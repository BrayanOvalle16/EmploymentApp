import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterModule , CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isEmpresa: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
      console.log(isAuthenticated);
      this.isLoggedIn = isAuthenticated;
    });
  }
  onToggleIsEmpresa() {
    this.isEmpresa = !this.isEmpresa;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(["/"])
  }

}
