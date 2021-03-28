import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEventComponent } from './selected-event.component';

describe('SelectedEventComponent', () => {
  let component: SelectedEventComponent;
  let fixture: ComponentFixture<SelectedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
