import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mostrarSenha = false;

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
  usuario: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Função chamada ao clicar no botão "Entrar"
  fazerLogin() {
    this.authService.login(this.usuario, this.senha).subscribe({
      next: (resposta) => {
        // Se der certo: salva o token e vai pro dashboard
        this.authService.saveToken(resposta);
        this.router.navigate(['/dashboard']);
      },
      error: (erro) => {
        // Se der erro: mostra mensagem
        this.mensagemErro = 'Usuário ou senha incorretos!';
      }
    });
  }
}
