import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastquestionsPage } from './pastquestions.page';

describe('PastquestionsPage', () => {
  let component: PastquestionsPage;
  let fixture: ComponentFixture<PastquestionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PastquestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
