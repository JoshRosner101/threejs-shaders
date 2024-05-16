import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectionsComponent } from './reflections.component';

describe('ReflectionsComponent', () => {
  let component: ReflectionsComponent;
  let fixture: ComponentFixture<ReflectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReflectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReflectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
