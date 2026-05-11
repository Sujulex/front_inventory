import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html', // Revisa que coincida con tu archivo
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm!: FormGroup;
  public errorMessage: string = '';
  public hidePassword = true; // Controla el ícono del "ojito" para ver contraseña

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // Cambia 'username' por 'email' si tu backend pide correo en lugar de usuario
      username: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.errorMessage = '';
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        
        // Si tu backend devuelve un token JWT (ej. response.token), lo guardamos:
        if (response && response.token) {
          this.authService.saveToken(response.token);
        }

        // Redirigimos al usuario al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login', err);
        // Mostramos un mensaje de error si las credenciales son incorrectas
        this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
      }
    });
  }
}
