import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScheduledPage } from './scheduled.page';

describe('ScheduledPage', () => {
  let component: ScheduledPage;
  let fixture: ComponentFixture<ScheduledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
