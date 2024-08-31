import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/api";
import { UtilsService } from "./utils/utils.service";
import { Token } from "./models/Oauth";
import { NavigationEnd, Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import { KEY_TOKEN } from "./models/keysStorage";
import { VagasService } from "./service/vagas.service";
import { Vagas } from "./models/vagas";


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
  public admin: boolean = true;
  

  constructor(private utils: UtilsService, private router: Router,private cdr: ChangeDetectorRef, private vagasService: VagasService) {
    this.vValidaMenu = true;
    this.usernameAndToken = utils.getUsernameAndToken();
    this.admin = true;
    this.items = [
      {
        label: "Vagas",
        icon: "pi pi-fw pi-file",
        items: [
          {
            label: "Nova Vaga",
            icon: "pi pi-fw pi-plus",
          },
          {
            label: "Lista Vagas",
            icon: "pi pi-list",
          },
          {
            label: "Minhas Vagas",
            icon: "pi pi-list",
          },
        ],
      },
      {
        label: "Candidatos",
        icon: "pi pi-users",
      },
      {
        label: "Sair",
        icon: "pi pi-fw pi-power-off",
        command: () => this.sair()
      },
    ];

    this.utils.userData$.subscribe((userData) => {
      this.usernameAndToken = userData;
      this.vValidaMenu = this.usernameAndToken !== null && this.usernameAndToken.token !== null;
      this.cdr.markForCheck();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/login') || url.includes('/cadastro')) {
          this.vValidaMenu = false;
          this.cdr.markForCheck();
        }
      }
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
      const vagasService = await this.vagasService.listarVagas();
      if (vagasService !== undefined) {
        this.vagas = vagasService;
        this.cdr.detectChanges(); 
      }
    } catch (error) {
      console.error("Erro ao listar vagas: ", error);
    }
  }
}
