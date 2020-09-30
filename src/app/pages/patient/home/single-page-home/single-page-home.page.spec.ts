import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinglePageHomePage } from './single-page-home.page';

describe('SinglePageHomePage', () => {
  let component: SinglePageHomePage;
  let fixture: ComponentFixture<SinglePageHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePageHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePageHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
