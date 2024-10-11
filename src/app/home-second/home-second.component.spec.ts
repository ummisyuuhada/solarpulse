import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecondComponent } from './home-second.component';

describe('HomeSecondComponent', () => {
  let component: HomeSecondComponent;
  let fixture: ComponentFixture<HomeSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
