import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutAsPage } from './about-us.page';

describe('AboutAsPage', () => {
  let component: AboutAsPage;
  let fixture: ComponentFixture<AboutAsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutAsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
