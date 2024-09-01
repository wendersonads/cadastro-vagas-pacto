import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-minhas-vagas',
  template:  `
  <p *ngIf="!vagas || vagas.length === 0">
    Você não está candidatado a nenhuma vaga.
  </p>
  <p-table
    *ngIf="vagas && vagas.length > 0"
    [value]="vagas"
    responsiveLayout="scroll"
    [paginator]="true"
    [rows]="5"
  >
    <ng-template pTemplate="header">
      <tr>
        <th>Nome da Vaga</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-vaga>
      <tr>
        <td>{{ vaga.tituloVaga }}</td>
      </tr>
    </ng-template>
  </p-table>
  <p-footer>
    <div class="footer-container">
      <p-button
        icon="pi pi-times"
        label="Fechar"
        styleClass="p-button-danger"
        (onClick)="onCloseModal()"
      ></p-button>
    </div>
  </p-footer>
`,
  styleUrls: ['./minhas-vagas.component.css']
})
export class MinhasVagasComponent implements OnInit {

  vagas: any[] = [];
  constructor(public config: DynamicDialogConfig,private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.vagas = this.config.data.vagas || [];

  }

  onCloseModal() {
    this.ref.close()
  }
}
