import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostsService } from './posts.service';

@Component({
  selector: 'lib-posts',
  template: `
    <ng-container *ngIf="posts$ | async as posts; else loading">
      <ng-container *ngIf="posts.length; else noPostsFound">
        <ul *ngFor="let post of posts">
          <li>UserId: {{ post.userId }}</li>
          <li>Id: {{ post.id }}</li>
          <li>Title: {{ post.title }}</li>
          <li>Body: {{ post.body }}</li>
        </ul>
      </ng-container>
    </ng-container>
    <ng-template #loading> Loading... </ng-template>
    <ng-template #noPostsFound> No Posts Found </ng-template>
  `,
  styles: [],
})
export class PostsComponent {
  pageSize$ = new BehaviorSubject<number>(3);
  posts$ = this.pageSize$.pipe(
    switchMap((pageSize) => this.postsService.getPosts(pageSize))
  );

  constructor(private readonly postsService: PostsService) {}
}
