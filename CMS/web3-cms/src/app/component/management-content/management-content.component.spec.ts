import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementContentComponent } from './management-content.component';

describe('ManagementContentComponent', () => {
  let component: ManagementContentComponent;
  let fixture: ComponentFixture<ManagementContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementContentComponent]
    });
    fixture = TestBed.createComponent(ManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
