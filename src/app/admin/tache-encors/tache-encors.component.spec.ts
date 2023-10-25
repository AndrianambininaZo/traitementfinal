import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEncorsComponent } from './tache-encors.component';

describe('TacheEncorsComponent', () => {
  let component: TacheEncorsComponent;
  let fixture: ComponentFixture<TacheEncorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheEncorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheEncorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
