import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousTacheComponent } from './tous-tache.component';

describe('TousTacheComponent', () => {
  let component: TousTacheComponent;
  let fixture: ComponentFixture<TousTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TousTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TousTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
