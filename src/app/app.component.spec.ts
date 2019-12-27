import { Location } from '@angular/common';
import { async, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('Customer List return button click check router', async(inject([Location],
    (location: Location) => {
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('a.navbar-brand'));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/');
      });
    })
  ));
});
