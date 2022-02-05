import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiPageComponent } from './poi-page.component';

describe('PoiPageComponent', () => {
  let component: PoiPageComponent;
  let fixture: ComponentFixture<PoiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
