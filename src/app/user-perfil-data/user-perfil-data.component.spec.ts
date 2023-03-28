import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPerfilDataComponent } from './user-perfil-data.component';

describe('UserPerfilDataComponent', () => {
  let component: UserPerfilDataComponent;
  let fixture: ComponentFixture<UserPerfilDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPerfilDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPerfilDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
