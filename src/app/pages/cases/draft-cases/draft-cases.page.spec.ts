import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DraftCasesPage } from './draft-cases.page';

describe('DraftCasesPage', () => {
  let component: DraftCasesPage;
  let fixture: ComponentFixture<DraftCasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftCasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DraftCasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
