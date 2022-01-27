import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFootherComponent } from './page-foother.component';

describe('PageFootherComponent', () => {
  let component: PageFootherComponent;
  let fixture: ComponentFixture<PageFootherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFootherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFootherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
