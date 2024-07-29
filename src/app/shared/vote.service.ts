// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { VotePayload } from './vote-button/vote-payload';
// import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization: this.getAuthenticationToken
// });

// @Injectable({
//   providedIn: 'root'
// })
// export class VoteService {

//   constructor(private http: HttpClient) { }

//   vote(votePayload: VotePayload): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/api/votes`, votePayload, { headers: httpHeaders });
//   }

//   getAuthenticationToken() {
//     return localStorage.getItem('authenticationToken');
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/api/votes`, votePayload, { headers: httpHeaders });
  }

  getAuthenticationToken(): string | null {
    return localStorage.getItem('authenticationToken');
  }
}

