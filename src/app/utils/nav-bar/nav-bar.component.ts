import { Component, ɵɵNgOnChangesFeature } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { rolesDto } from '../../Modelos/rolesDto';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isEmpresa: boolean = false;
  isLoggedIn: boolean = false;
  roles: string[] = [];
  rolesEnum = rolesDto;
  drawerOpened: boolean = false; // Controla si el sidenav está abierto o cerrado

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;

      if (isAuthenticated) {
        this.roles = this.authService.getRoles();
      } else {
        this.roles = [];
      }
    });
  }
  
  onToggleIsEmpresa() {
    this.isEmpresa = !this.isEmpresa;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    this.roles = [];
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  // ✅ Métodos de utilidad
  hasRole(role: rolesDto): boolean {
    return this.roles.includes(role);
  }
}
