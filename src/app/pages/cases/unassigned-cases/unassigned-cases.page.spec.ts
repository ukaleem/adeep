import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnassignedCasesPage } from './unassigned-cases.page';

describe('UnassignedCasesPage', () => {
  let component: UnassignedCasesPage;
  let fixture: ComponentFixture<UnassignedCasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedCasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnassignedCasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
