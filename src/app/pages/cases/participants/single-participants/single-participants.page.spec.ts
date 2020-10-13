import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleParticipantsPage } from './single-participants.page';

describe('SingleParticipantsPage', () => {
  let component: SingleParticipantsPage;
  let fixture: ComponentFixture<SingleParticipantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleParticipantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleParticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
