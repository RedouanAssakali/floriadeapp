import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAudioPlayerComponent } from './single-audio-player.component';

describe('SingleAudioPlayerComponent', () => {
  let component: SingleAudioPlayerComponent;
  let fixture: ComponentFixture<SingleAudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAudioPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
