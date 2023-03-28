import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDataComponent } from './comments-data.component';

describe('CommentsDataComponent', () => {
  let component: CommentsDataComponent;
  let fixture: ComponentFixture<CommentsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
