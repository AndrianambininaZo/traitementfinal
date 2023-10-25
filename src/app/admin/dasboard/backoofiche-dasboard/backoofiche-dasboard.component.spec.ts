import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackooficheDasboardComponent } from './backoofiche-dasboard.component';

describe('BackooficheDasboardComponent', () => {
  let component: BackooficheDasboardComponent;
  let fixture: ComponentFixture<BackooficheDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackooficheDasboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackooficheDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
