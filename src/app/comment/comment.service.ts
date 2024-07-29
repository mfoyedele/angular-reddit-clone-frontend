import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${environment.apiUrl}/api/comments/by-post` + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpClient.post<any>(`${environment.apiUrl}/api/comments`, commentPayload, { headers: httpHeaders });
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(`${environment.apiUrl}/api/comments/by-user` + name);
  }

  getAuthenticationToken(): string | null {
    return localStorage.getItem('authenticationToken');
  }
}
