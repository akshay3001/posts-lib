import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [HttpClientModule],
  exports: [PostsComponent],
})
export class PostsModule {}
