import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEholeComponent } from './create-ehole.component';

describe('CreateEholeComponent', () => {
  let component: CreateEholeComponent;
  let fixture: ComponentFixture<CreateEholeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEholeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
