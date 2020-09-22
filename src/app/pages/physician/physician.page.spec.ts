import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhysicianPage } from './physician.page';

describe('PhysicianPage', () => {
  let component: PhysicianPage;
  let fixture: ComponentFixture<PhysicianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhysicianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
