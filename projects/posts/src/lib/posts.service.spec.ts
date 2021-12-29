import { TestBed } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostsService } from './posts.service';

export const mockPosts = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
];

describe('PostsService', () => {
  let service: PostsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPosts', () => {
    it('should be defined', () => {
      expect(service.getPosts).toBeDefined();
    });

    it('should load posts', (done: DoneFn) => {
      const params = {
        page: '1',
        sort: 'asc',
        order: 'name',
        start: '0',
        end: '10',
        q: 'test',
      };
      service.getPosts(params).subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        expect(posts.length).toEqual(2);
        done();
      });

      const req = httpController.expectOne(
        'https://jsonplaceholder.typicode.com/posts?_page=1&_end=10&_order=name&_q=test&_sort=asc&_start=0'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockPosts, { headers: new HttpHeaders(params) });
    });
    it('should load posts with no params', (done: DoneFn) => {
      const params = {
        page: undefined,
        sort: undefined,
        order: undefined,
        start: undefined,
        end: undefined,
        q: undefined,
      };
      service.getPosts(params).subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        expect(posts.length).toEqual(2);
        done();
      });

      const req = httpController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockPosts, { headers: new HttpHeaders() });
    });
  });
});
