import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargerOfOfficheComponent } from './telecharger-of-offiche.component';

describe('TelechargerOfOfficheComponent', () => {
  let component: TelechargerOfOfficheComponent;
  let fixture: ComponentFixture<TelechargerOfOfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelechargerOfOfficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelechargerOfOfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
