import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../elements/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../models/vehicle';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Adicionando os módulos e o seu HeaderComponent
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  listaVeiculos: Vehicle[] = [];
  codigoBusca: string = ''; 
  veiculoDetalhe: Vehicle | null = null; 
  erroBusca: boolean = false;
  mensagemErro: string = '';

  // Variável que guarda o veículo que está sendo exibido nos cards e na imagem
  veiculoSelecionado: Vehicle | null = null; 

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    // 1. Carrega a lista quando a tela inicia
    this.carregarListaGeral();
  }

  carregarListaGeral() {
    this.vehicleService.getVehicles().subscribe({
      next: (dados) => {
        this.listaVeiculos = dados;
        
        // 2. Garante que o primeiro carro seja selecionado na inicialização
        if (dados.length > 0) {
          this.veiculoSelecionado = dados[0]; 
        }
      },
      error: (err) => {
        // Se a API falhar, ao menos a lista fica vazia e o erro é registrado
        console.error("Erro ao carregar lista de veículos da API:", err);
      }
    });
  }

  // Função para mudar o veículo selecionado ao interagir com o dropdown
  selecionarVeiculo(event: Event) {
    const nomeVeiculo = (event.target as HTMLSelectElement).value;
    this.veiculoSelecionado = this.listaVeiculos.find(v => v.vehicle === nomeVeiculo) || null;
  }
  
  // ✅ NOVO: Função para gerar o caminho correto da imagem, tratando espaços e capitalização
  getImagePath(): string {
    if (!this.veiculoSelecionado || !this.veiculoSelecionado.vehicle) {
      return '';
    }
    
    // Pega o nome do veículo (ex: "Bronco Sport")
    let vehicleName = this.veiculoSelecionado.vehicle;
    
    // Remove espaços (Ex: "Bronco Sport" -> "BroncoSport")
    const formattedName = vehicleName.replace(/\s/g, ''); 
    
    // Converte a primeira letra para minúscula (Ex: "Ranger" -> "ranger")
    // E garante que BroncoSport fique com o 'S' maiúsculo se for esse o nome do seu arquivo
    let fileName = formattedName.charAt(0).toLowerCase() + formattedName.slice(1);
    
    return `assets/img/${fileName}.png`;
  }
  
  // Funções de busca (mantidas)
  buscarPorCodigo() {
    // ... (Mantenha a lógica do buscarPorCodigo)
    this.erroBusca = false; // Reseta o erro
    this.veiculoDetalhe = null; // Limpa o resultado anterior
    this.mensagemErro = ''; // Limpa a mensagem de erro

    const vinCode = this.codigoBusca.trim();

    // ✅ NOVO: Validação para 20 caracteres (e campo vazio)
    if (vinCode.length === 0) {
      this.erroBusca = true;
      this.mensagemErro = 'Digite um Código VIN para buscar.';
      return;
    }
    
    if (vinCode.length !== 20) {
      this.erroBusca = true;
      this.mensagemErro = 'O Código de busca deve ter exatamente 20 caracteres.';
      return;
    }

    // Se a validação passou, faz a chamada à API
    this.vehicleService.getVehicleByVin(vinCode).subscribe({
      next: (carro) => {
        // Se a busca for bem-sucedida
        this.veiculoDetalhe = carro;
      },
      error: (erro) => {
        // Se a busca retornar erro 400 da API (Código não encontrado)
        this.erroBusca = true;
        this.mensagemErro = 'Código VIN utilizado não foi encontrado!';
        this.veiculoDetalhe = null;
      }
    });
  }
}
