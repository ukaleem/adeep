import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PathwayPage } from './pathway.page';

describe('PathwayPage', () => {
  let component: PathwayPage;
  let fixture: ComponentFixture<PathwayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PathwayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
