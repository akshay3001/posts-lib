import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from './posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly http: HttpClient) {}

  getPosts(size: number = 3): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseURL}/posts?_page=${size}`);
  }
}
