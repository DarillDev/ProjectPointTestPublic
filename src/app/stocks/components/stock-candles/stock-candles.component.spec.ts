import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCandlesComponent } from './stock-candles.component';

describe('StockCandlesComponent', () => {
  let component: StockCandlesComponent;
  let fixture: ComponentFixture<StockCandlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCandlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCandlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
