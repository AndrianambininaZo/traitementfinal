import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOfOfficheComponent } from './liste-of-offiche.component';

describe('ListeOfOfficheComponent', () => {
  let component: ListeOfOfficheComponent;
  let fixture: ComponentFixture<ListeOfOfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOfOfficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOfOfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
