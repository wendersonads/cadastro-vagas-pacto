import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaDialogComponent } from './cadastro-vaga-dialog.component';

describe('CadastroVagaDialogComponent', () => {
  let component: CadastroVagaDialogComponent;
  let fixture: ComponentFixture<CadastroVagaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVagaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVagaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
