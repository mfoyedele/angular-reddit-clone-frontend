import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Array<SubredditModel>>(`${environment.apiUrl}/api/subreddit`, { headers: httpHeaders });
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<SubredditModel>(`${environment.apiUrl}/api/subreddit`, subredditModel, { headers: httpHeaders });
  }

  private getAuthenticationToken(): string | null {
    return localStorage.getItem('authenticationToken');
  }
}
