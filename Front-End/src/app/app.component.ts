import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/api";
import { UtilsService } from "./utils/utils.service";
import { Token } from "./models/Oauth";
import { NavigationEnd, Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import { KEY_TOKEN } from "./models/keysStorage";
import { VagasService } from "./service/vagas.service";
import { Vagas } from "./models/vagas";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { CadastroVagaDialogComponent } from "./components/cadastro-vaga-dialog/cadastro-vaga-dialog.component";
import { User, UserStorage } from "./models/user";
import { HttpErrorResponse } from "@angular/common/http";
import { CandidatosDialogComponent } from "./components/candidatos-dialog/candidatos-dialog.component";
import { OauthService } from "./service/oauth.service";
import { MinhasVagasComponent } from "./components/minhas-vagas/minhas-vagas.component";
import { filter } from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit{

  items: MenuItem[] = [];
  public usernameAndToken: Token | null = null;
  public vValidaMenu: boolean;
  public vagas: Vagas[] = [];
  public admin: boolean = false;
  public ref!: DynamicDialogRef;
  public userStorage: UserStorage | null = null;
  public vagasUser: any[] = []; 
  public loading = false;

  constructor(private utils: UtilsService, private router: Router,private cdr: ChangeDetectorRef, 
    private vagaService: VagasService,private dialogService: DialogService, private oAuth: OauthService) {

    this.vValidaMenu = true;
    this.usernameAndToken = utils.getUsernameAndToken();
    this.items = [
      {
        label: "Sair",
        icon: "pi pi-fw pi-power-off",
        command: () => this.sair()
      },
    ];

    this.utils.userData$.subscribe((userData) => {
      this.usernameAndToken = userData;
      this.vValidaMenu = this.usernameAndToken !== null && this.usernameAndToken.token !== null;
      this.admin = this.usernameAndToken !== null ? this.usernameAndToken.idPerfilUsuario === 1 : false; 
      this.cdr.markForCheck();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/login') || url.includes('/cadastro')) {
          this.vValidaMenu = false;
          this.cdr.markForCheck();
        }else {
          this.listarVagas();
          this.cdr.markForCheck();
        }
      }
      this.utils.userStorage$.subscribe((userStorage) => {
        this.userStorage = userStorage;
        // this.validaAdmin();
        this.cdr.markForCheck();
      });
    });

    this.utils.userStorage$.subscribe((userStorage) => {
      this.userStorage = userStorage;
      // this.validaAdmin();
      this.cdr.markForCheck();
    });

     const vValidaToken = this.usernameAndToken !== null ? 
         this.usernameAndToken.token !== null && this.usernameAndToken.token !== '' : false;
    if (!vValidaToken) {
      this.router.navigate(["/login"]);
    }
  }
  async ngAfterViewInit(): Promise<void> {
    await this.listarVagas();
  }

  ngOnInit() {
  }


  public sair() {
    localStorage.removeItem(KEY_TOKEN);
    this.router.navigate(["/login"]);
  }

  public async listarVagas(): Promise<void>{
    try {
      const vagasService = await this.vagaService.listarVagas();
      if (vagasService !== undefined) {
        this.vagas = vagasService;
        this.cdr.detectChanges(); 
      }
    } catch (error) {
      console.error("Erro ao listar vagas: ", error);
    }
  }

  openCadastroDialog() {
    this.ref = this.dialogService.open(CadastroVagaDialogComponent, {
      header: 'Cadastrar Nova Vaga',
      width: '30rem',
      height: '50%'
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
          this.listarVagas();
      }
    });
  }

  async candidatar(idVaga: number) {
   const idCandidato = this.userStorage?.idUsuario ?? null;
   if (idVaga !== null && idCandidato !== null) {
     await this.vagaService.candidatarNaVaga(idVaga, idCandidato).then((retCadVaga: string) => {
      this.utils.messageSucess(retCadVaga);
      this.listarVagas();
     }).catch((error: HttpErrorResponse) => {
        this.utils.messageErrorCantidatarVaga(error);
     })
   }
  }

  private validaAdmin() : void {
    if (this.userStorage !== null && this.userStorage.idPerfilUsuario !== null) {
      this.admin = this.userStorage.idPerfilUsuario === 1; //Perfil 1 Admin
      this.cdr.markForCheck();
    }
  }

  openCandidatosDialog(candidatos: any[]) {
    console.log('CANDIDATOS:',candidatos);
    if (candidatos) {
      this.ref = this.dialogService.open(CandidatosDialogComponent, {
        header: 'Candidatos',
        width: '400px',
        data: {
          candidatos: candidatos
        }
      });
    }
  }
  private async buscarDadosUser(): Promise<void> {
    const username = this.usernameAndToken?.username ?? '';
    this.oAuth.buscarDadosUser(username).then((retUser: User | void) => {
        if (retUser && "idUsuario" in retUser) {
          this.vagasUser = retUser.vagas;
          this.utils.setDataUserStorage(retUser);
        }
    }).catch(error =>{
      console.error("Erro ao buscar dados do usuário");
    });
  }

  async openVagasDialog() {    
    try {
      await this.buscarDadosUser().then(retUser => {
        if (this.vagasUser) {
          setTimeout(() => {
            this.ref = this.dialogService.open(MinhasVagasComponent, {
              header: 'Minhas Vagas',
              width: '400px',
              data: {
                vagas: this.vagasUser
              }
            });
            this.ref.onClose.subscribe(() => {
              this.loading = false;
            });
          }, 1000); 
        }
      });
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      this.loading = false; 
    }
  }
}
