import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaretakerPage } from './caretaker.page';

describe('CaretakerPage', () => {
  let component: CaretakerPage;
  let fixture: ComponentFixture<CaretakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaretakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaretakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
