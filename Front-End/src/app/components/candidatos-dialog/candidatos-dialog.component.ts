import { Component, Input, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-candidatos-dialog",
  template: `
    <p *ngIf="!candidatos || candidatos.length === 0">
      Nenhum candidato para esta vaga.
    </p>
    <p-table
      *ngIf="candidatos && candidatos.length > 0"
      [value]="candidatos"
      responsiveLayout="scroll"
      [paginator]="true"
      [rows]="5"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Nome do Candidato</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-candidato>
        <tr>
          <td>{{ candidato.nomeUsuario }}</td>
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
  styleUrls: ["./candidatos-dialog.component.css"],
})
export class CandidatosDialogComponent implements OnInit {
  candidatos: any[] = [];
  display: boolean = true;
  constructor(public config: DynamicDialogConfig,private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.candidatos = this.config.data.candidatos || [];
    console.log("CANDIDATOS MODAL: ", this.candidatos);
  }

  onCloseModal() {
    this.ref.close()
  }
}
