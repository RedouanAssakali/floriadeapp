import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiPlantsComponent } from './poi-plants.component';

describe('PoiPlantsComponent', () => {
  let component: PoiPlantsComponent;
  let fixture: ComponentFixture<PoiPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiPlantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
