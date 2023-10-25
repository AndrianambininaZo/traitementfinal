import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementOfOfficheComponent } from './traitement-of-offiche.component';

describe('TraitementOfOfficheComponent', () => {
  let component: TraitementOfOfficheComponent;
  let fixture: ComponentFixture<TraitementOfOfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementOfOfficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementOfOfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
