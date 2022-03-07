import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/post.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts()
  {
    this.http.get<{message: String, posts: any}>('http://localhost:3000/api/posts').pipe(map((postData)=>{
      return postData.posts.map((post:any) =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
    // return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: String){
  //  return {...this.posts.find( p => p.id === id)};
  return this.http.get<{_id: String, title: String, content: String}>('http://localhost:3000/api/posts/'+id);
  }

  addPost(title: String, content: String)
  {
    const post: Post = { id: '', title: title, content: content};
    this.http.post<{message: String, postId: String}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
      // console.log(responseData);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: String, title: String, content: String){
    const post: Post = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/'+id, post)
    .subscribe(response=>{
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex( p=> p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
      console.log(response);
    });
  }

  deletePost(postId: String){
    this.http.delete('http://localhost:3000/api/posts/'+postId).subscribe(()=>{
      // console.log("Deleted");
      const updatedPosts = this.posts.filter(post=> post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
    })
  }

}
