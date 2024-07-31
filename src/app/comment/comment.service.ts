import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> { 
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });   
    const params = new HttpParams().set('postId', postId.toString());
    return this.httpClient.get<CommentPayload[]>(`${environment.apiUrl}/api/comments`, { headers: httpHeaders, params });
}

  

  postComment(commentPayload: CommentPayload): Observable<any> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.post<any>(`${environment.apiUrl}/api/comments`, commentPayload, { headers: httpHeaders });
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.get<CommentPayload[]>(`${environment.apiUrl}/api/comments?userName=${name}`, { headers: httpHeaders });
}

  private getAuthenticationToken(): string | null {
    return localStorage.getItem('authenticationToken');
  }
}
