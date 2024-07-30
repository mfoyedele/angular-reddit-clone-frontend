import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${environment.apiUrl}/api/posts`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    const token = this.getAuthenticationToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/api/posts`, postPayload, { headers: httpHeaders });
  }

  getPost(id?: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.apiUrl}/api/posts/` + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiUrl}/api/posts/by-user` + name);
  }

  private getAuthenticationToken(): string | null {
    return localStorage.getItem('authenticationToken');
  }
}
