import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { rolesDto } from '../../Modelos/rolesDto';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const roles : string [] = this.authService.getRoles();
    if (roles!= null && roles.some(e => e === rolesDto.admin.valueOf())) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
