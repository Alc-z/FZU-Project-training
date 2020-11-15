import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryEditNamePage } from './category-edit-name.page';

describe('CategoryEditNamePage', () => {
  let component: CategoryEditNamePage;
  let fixture: ComponentFixture<CategoryEditNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEditNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryEditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
