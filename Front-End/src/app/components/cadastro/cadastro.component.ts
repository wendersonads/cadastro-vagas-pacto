import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Oauth } from 'src/app/models/Oauth';
import { OauthService } from 'src/app/service/oauth.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastroComponent implements OnInit {
    public name: string = "";
    public username: string = "";
    public password: string = "";

  constructor(private route: Router, private oauth: OauthService, private utils: UtilsService) { }

  ngOnInit(): void {

  }
  
  public cadastrar() {
    const dadosCadastro: Oauth = {name: this.name, username: this.username, password: this.password};
    this.oauth.cadastrar(dadosCadastro).then(async retUser => {
      if (retUser) {
        await this.utils.messageSucess("Cadastro Realizado Com Sucesso!");
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
      }
    }).catch(async (error: HttpErrorResponse) => {
      await this.utils.messageError(error);
    });
  }
}
