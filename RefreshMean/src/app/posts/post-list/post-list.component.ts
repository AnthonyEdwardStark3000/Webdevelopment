import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


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
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  postSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription = new Subscription();
  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number})=>{
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onChangedPage(pageData: PageEvent)
  { //pagination
    // console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: String){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
};
