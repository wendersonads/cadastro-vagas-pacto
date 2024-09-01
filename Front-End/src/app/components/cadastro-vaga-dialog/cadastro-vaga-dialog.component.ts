import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovaVaga } from 'src/app/models/vagas';
import { VagasService } from 'src/app/service/vagas.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-cadastro-vaga-dialog',
  templateUrl: './cadastro-vaga-dialog.component.html',
  styleUrls: ['./cadastro-vaga-dialog.component.css']
})
export class CadastroVagaDialogComponent{

  form: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private utils: UtilsService,
               private vagaService: VagasService) {
    this.form = this.fb.group({
      tituloVaga: ['', Validators.required],
      descricaoVaga: ['', Validators.required],
    });
  }


  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const titulo = this.form.get('tituloVaga')?.value;
      const descricao = this.form.get('descricaoVaga')?.value 
      const vaga: NovaVaga = {descricao: descricao, titulo: titulo};
      await this.cadastarNovaVaga(vaga).then(ret => {
        if (ret) {
          setTimeout(() => {
             this.ref.close(this.form.value);
          }, 2000);
        }else {
          return;
        }
      });
    }else {
      this.utils.messageErrorGeneric('Todos os campos são obrigatórios!');
    }
  }
  onCancelar(): void {
    this.ref.close();
  }

  private async cadastarNovaVaga(vaga: NovaVaga): Promise<boolean> {
    if (vaga) {
      this.vagaService.novaVaga(vaga).then((retVaga) => {
       this.utils.messageSucess('Cadastro realizado!');
       return true;
      }).catch((error: HttpErrorResponse) => {
        return false;
        console.log('ERRO: ', error);
        this.utils.messageError(error);
      });
    }

    return true;
}
}
