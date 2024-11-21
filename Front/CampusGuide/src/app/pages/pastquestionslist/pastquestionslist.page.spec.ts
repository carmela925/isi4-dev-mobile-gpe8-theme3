import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastquestionslistPage } from './pastquestionslist.page';

describe('PastquestionslistPage', () => {
  let component: PastquestionslistPage;
  let fixture: ComponentFixture<PastquestionslistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PastquestionslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
