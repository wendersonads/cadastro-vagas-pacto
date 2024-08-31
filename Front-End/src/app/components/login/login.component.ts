import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Message, MessageService } from "primeng/api";
import { KEY_TOKEN } from "src/app/models/keysStorage";
import { Oauth } from "src/app/models/Oauth";
import { OauthService } from "src/app/service/oauth.service";
import { UtilsService } from "src/app/utils/utils.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  public loading: boolean = false;
  public messages: Message[] = [];

  constructor(
    private oAuth: OauthService,
    private route: Router,
    private utils: UtilsService
  ) {}

  public async logar() {
    this.loading = true;
    const oAuth: Oauth = { username: this.username, password: this.password };

    await this.oAuth.logar(oAuth).then((dadosUser) => {
        if (dadosUser && "token" in dadosUser) {
          const userData = {
            username: this.username,
            token: dadosUser.token,
          };
          this.utils.setUsernameAndToken(userData);
          this.route.navigate(["/"]);
        }
        this.loading = false;
      })
      .catch((error: HttpErrorResponse) => {
        console.error("Erro ao logar: ", error.message);
        this.loading = false;
        this.utils.messageError(error);
      });
  }

 public direcionarTelaCadastro() {
    this.route.navigate(["/cadastro"]);
  }
}
