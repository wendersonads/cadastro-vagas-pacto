import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UtilsService } from './utils/utils.service';
import { Token } from './models/Oauth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  items: MenuItem[] = [];
  public usernameAndToken: Token | null =  null;

  constructor(private utils: UtilsService) {
    this.usernameAndToken = utils.getUsernameAndToken();
    this.items = [
      {
          label: 'Vagas',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: 'Nova Vaga',
                  icon: 'pi pi-fw pi-plus',
              },
              {
                label: 'Lista Vagas',
                icon: 'pi pi-list',
            },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-trash'
              },
          ]
      },
      {
        label: 'Candidatos',
        icon: 'pi pi-users'
      },
      {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
      },
  ];
  }
  ngOnInit() {
  }
}
