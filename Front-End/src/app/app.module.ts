import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import 'eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DockModule } from 'primeng/dock';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { DialogService } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AvatarModule } from 'primeng/avatar';
import { CadastroVagaDialogComponent } from './components/cadastro-vaga-dialog/cadastro-vaga-dialog.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    CadastroVagaDialogComponent

  ],
  imports: [
    FieldsetModule,
    ListboxModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    PanelMenuModule,
    RadioButtonModule,
    DockModule,
    TableModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbSelectModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    InputNumberModule,
    PasswordModule,
    MenubarModule,
    AvatarModule
  ],
  providers: [MessageService, DialogService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class AppModule { }
