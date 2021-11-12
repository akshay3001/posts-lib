import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts, PostsParams } from './posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly basePath = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly http: HttpClient) {}

  getPosts({
    page,
    end,
    order,
    q,
    sort,
    start,
  }: PostsParams): Observable<Posts[]> {
    let params = new HttpParams();
    if (page !== undefined && page !== null) {
      params = this.addToHttpParams(params, page, '_page');
    }
    if (end !== undefined && end !== null) {
      params = this.addToHttpParams(params, end, '_end');
    }
    if (order !== undefined && order !== null) {
      params = this.addToHttpParams(params, order, '_order');
    }
    if (q !== undefined && q !== null) {
      params = this.addToHttpParams(params, q, '_q');
    }
    if (sort !== undefined && sort !== null) {
      params = this.addToHttpParams(params, sort, '_sort');
    }
    if (start !== undefined && start !== null) {
      params = this.addToHttpParams(params, start, '_start');
    }
    console.log('PostsService :: HTTP Params :: ', params['updates']);
    return this.http.get<Posts[]>(`${this.basePath}/posts`, { params });
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
