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

  getPosts({ page }: PostsParams): Observable<Posts[]> {
    let params = new HttpParams();
    if (page !== undefined && page !== null) {
      params = this.addToHttpParams(params, page, '_page');
    }
    return this.http.get<Posts[]>(`${this.baseURL}/posts`, { params });
  }

  private addToHttpParams(httpParams: HttpParams, value: any, key: string) {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value: any,
    key?: string
  ) {
    if (value == null) {
      return httpParams;
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            value.toISOString().substr(0, 10)
          );
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }
}
