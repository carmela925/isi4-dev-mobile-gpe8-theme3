import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterNextPage } from './register-next.page';

describe('RegisterNextPage', () => {
  let component: RegisterNextPage;
  let fixture: ComponentFixture<RegisterNextPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
