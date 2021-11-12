import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PostsParams } from './posts.interface';
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
  params$ = new BehaviorSubject<PostsParams>({
    page: '3',
  });
  posts$ = this.params$.pipe(
    tap((params) => console.log('PostsComponent :: params$ :: ', params)),
    switchMap((params) => this.postsService.getPosts(params))
  );

  constructor(private readonly postsService: PostsService) {}
}
