import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionOfOfficheComponent } from './reception-of-offiche.component';

describe('ReceptionOfOfficheComponent', () => {
  let component: ReceptionOfOfficheComponent;
  let fixture: ComponentFixture<ReceptionOfOfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionOfOfficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionOfOfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
