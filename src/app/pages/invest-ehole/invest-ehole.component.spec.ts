import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestEholeComponent } from './invest-ehole.component';

describe('InvestEholeComponent', () => {
  let component: InvestEholeComponent;
  let fixture: ComponentFixture<InvestEholeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestEholeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestEholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
