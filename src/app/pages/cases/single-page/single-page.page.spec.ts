import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinglePagePage } from './single-page.page';

describe('SinglePagePage', () => {
  let component: SinglePagePage;
  let fixture: ComponentFixture<SinglePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
