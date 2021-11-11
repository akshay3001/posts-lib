import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PostsComponent],
})
export class PostsModule {}
