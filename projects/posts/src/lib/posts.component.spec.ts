import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { mockPosts } from './posts.service.spec';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(async () => {
    const postsServiceStub = jasmine.createSpyObj(PostsService.name, [
      'getPosts',
    ]);
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        {
          provide: PostsService,
          useValue: postsServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    postsService = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
    postsService.getPosts.and.returnValue(of(mockPosts));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
