import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGithubUser, IReqParamsGithubUsers } from './models/github';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  usersList: IGithubUser[] = [];
  per_page_max = 30;
  isTurnOffAutoLoad = true;
  apiInterval: number | ReturnType<typeof setTimeout> = 0;
  fetchSubscribe$: Subscription | undefined;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    const getSinceValFromMemory = Number(localStorage.getItem('since')) || 0;
    this.fetchGithubUsers(getSinceValFromMemory, this.per_page_max);
  }
  fetchGithubUsers(since: number, per_page: number) {
    const reqObj: IReqParamsGithubUsers = {
      since: since,
      per_page: per_page,
    };
    this.fetchSubscribe$ = this.appService
      .getGithubUsers(reqObj)
      .subscribe((users: IGithubUser[]) => {
        console.log('users', users);
        this.usersList = Object.assign([], users);
        this.calcSetInMemory();
      });
  }
  calcSetInMemory() {
    const lastUserId: number = this.getLastUserObj()?.id || 0;
    localStorage.setItem('since', lastUserId.toString());
  }
  getLastUserObj(): IGithubUser {
    return this.usersList[this.usersList?.length - 1] || {};
  }
  loadNextUsersList() {
    const lastUserId = this.getLastUserObj()?.id;
    if (lastUserId) {
      this.fetchGithubUsers(lastUserId, this.per_page_max);
    }
  }
  autoLoadUsersList() {
    const that = this;
    if (this.isTurnOffAutoLoad) {
      this.apiInterval = 0;
      this.loadNextUsersList();
      this.apiInterval = window.setInterval(() => {
        that.loadNextUsersList();
      }, 30 * 1000);
    } else {
      window.clearInterval(Number(this.apiInterval));
      this.apiInterval = 0;
    }

    this.isTurnOffAutoLoad = !this.isTurnOffAutoLoad;
  }
  ngOnDestroy(): void {
    this.fetchSubscribe$?.unsubscribe();
  }
}
