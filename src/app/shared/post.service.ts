import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { environment } from '@environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer JWT-token'
});

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${environment.apiUrl}/api/posts`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/posts`, postPayload, { headers: httpHeaders });
  }

  getPost(id: number | undefined): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.apiUrl}/api/posts/` + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiUrl}/api/posts/by-user` + name);
  }
}
