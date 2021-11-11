import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts, PostsParams } from './posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly http: HttpClient) {}

  getPosts({ _page }: PostsParams): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseURL}/posts`, {
      params: {
        _page,
      },
    });
  }
}
