import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesJourComponent } from './taches-jour.component';

describe('TachesJourComponent', () => {
  let component: TachesJourComponent;
  let fixture: ComponentFixture<TachesJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TachesJourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TachesJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
