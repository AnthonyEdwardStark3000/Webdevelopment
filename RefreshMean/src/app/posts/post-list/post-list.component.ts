import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './post-list.component.html',
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   { title:"One", content: "Check the data one"},
  //   { title:"Two", content: "Check the data Two"},
  //   { title:"Three", content: "Check the data Three"},
  //   { title:"Four", content: "Check the data Four"},
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription = new Subscription();
  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: String){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
};
