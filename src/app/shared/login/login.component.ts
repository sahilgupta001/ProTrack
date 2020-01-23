import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  displayError = false;
  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login( form.value.email, form.value.password);
    this.displayError = !this.authService.getIsAuth();
  }

  isCredentialValid() {
    return this.displayError;
  }
}
