import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from 'src/app/post.model';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts()
  {
    this.http.get<{message: String, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
    // return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: String, content: String)
  {
    const post: Post = { id: 'd', title: title, content: content};
    this.http.post<{message: String}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
      console.log(responseData);
    });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
