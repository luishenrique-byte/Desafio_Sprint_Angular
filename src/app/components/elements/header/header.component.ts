import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ativo = false;
  isLogout = false;

  mensagemLogout() {

    if (localStorage.getItem('logged') === 'true') {
      alert('Você será desconectado da sua conta')
      localStorage.setItem('logged', 'false');
    }
  }

  mostrarSidebar() {
    this.ativo = !this.ativo;
  }

  esconderSidebar() {
    this.ativo = false;
  }
}
