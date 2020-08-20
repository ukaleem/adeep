import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllCasesPage } from './all-cases.page';

describe('AllCasesPage', () => {
  let component: AllCasesPage;
  let fixture: ComponentFixture<AllCasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllCasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
