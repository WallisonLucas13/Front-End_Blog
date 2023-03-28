import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasPublicacoesComponent } from './minhas-publicacoes.component';

describe('MinhasPublicacoesComponent', () => {
  let component: MinhasPublicacoesComponent;
  let fixture: ComponentFixture<MinhasPublicacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasPublicacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasPublicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
