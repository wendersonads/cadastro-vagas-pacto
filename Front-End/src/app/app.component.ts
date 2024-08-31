import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/api";
import { UtilsService } from "./utils/utils.service";
import { Token } from "./models/Oauth";
import { NavigationEnd, Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import { KEY_TOKEN } from "./models/keysStorage";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];
  public usernameAndToken: Token | null = null;
  public vValidaMenu: boolean;

  constructor(private utils: UtilsService, private router: Router,private cdr: ChangeDetectorRef) {
    this.vValidaMenu = true;
    this.usernameAndToken = utils.getUsernameAndToken();
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
  ngOnInit() {
   
  }

  public sair() {
    localStorage.removeItem(KEY_TOKEN);
    this.router.navigate(["/login"]);
  }
}
