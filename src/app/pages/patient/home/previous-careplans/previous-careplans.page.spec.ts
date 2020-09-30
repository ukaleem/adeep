import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousCareplansPage } from './previous-careplans.page';

describe('PreviousCareplansPage', () => {
  let component: PreviousCareplansPage;
  let fixture: ComponentFixture<PreviousCareplansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousCareplansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousCareplansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
