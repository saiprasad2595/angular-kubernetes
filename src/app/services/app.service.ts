import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGithubUser, IReqParamsGithubUsers } from '../models/github';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  getGithubUsers(reqObj: IReqParamsGithubUsers): Observable<IGithubUser[]> {
    const url = `https://api.github.com/users?since=${reqObj.since}&per_page=${reqObj.per_page}`;
    return this.http.get<IGithubUser[]>(url, {
      headers: new HttpHeaders({
        Authorization: 'token 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',
      }),
    });
  }
}
