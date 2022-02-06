import { AppService } from './services/app.service';
import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { dummyGitHubUser } from './testData';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
fdescribe('AppComponent', () => {
  let gitHubUserSpy: any;
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [AppService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return github users', () => {
    let appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getGithubUsers').and.callFake(() => {
      return of(dummyGitHubUser);
    });
    appComponent.fetchGithubUsers(0, 30);
    expect(appComponent.usersList.length).toEqual(1);
  });
  it('get last user list id ', () => {
    appComponent.usersList = dummyGitHubUser;
    fixture.detectChanges();
    const lastObj = appComponent.getLastUserObj();
    expect(lastObj.id).toEqual(370);
  });
});
