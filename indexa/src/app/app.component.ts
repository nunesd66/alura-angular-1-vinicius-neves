import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from "./componentes/contato/contato.component";

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

import agenda from './agenda.json'
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        ContainerComponent,
        CabecalhoComponent,
        SeparadorComponent,
        ContatoComponent,
        FormsModule
    ]
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz'
  contatos: Contato[] = agenda;

  filtroPorTexto: string = '';

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPorText(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }

    return this.contatos.filter(c => 
      this.removerAcentos(c.nome).toLocaleLowerCase()
        .includes(this.removerAcentos(this.filtroPorTexto.toLocaleLowerCase()))
    );
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorText().filter(c => 
      this.removerAcentos(c.nome).toLowerCase()
        .startsWith(this.removerAcentos(letra.toLowerCase()))
    );
  }
}
