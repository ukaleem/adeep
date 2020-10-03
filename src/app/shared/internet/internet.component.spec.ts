import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InternetComponent } from './internet.component';

describe('InternetComponent', () => {
  let component: InternetComponent;
  let fixture: ComponentFixture<InternetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
