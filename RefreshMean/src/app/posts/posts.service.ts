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
          id: post._id,
          imagePath: post.imagePath
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
  return this.http.get<{_id: String, title: String, content: String, imagePath: String}>('http://localhost:3000/api/posts/'+id);
  }

  addPost(title: String| any, content: String|any, image: File)
  {
    // const post: Post = { id: '', title: title, content: content};
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title); //for getting the image from the backend
    this.http.post<{message: String, post: Post}>('http://localhost:3000/api/posts', postData).subscribe((responseData)=>{
      // console.log(responseData);
      const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        imagePath: responseData.post.imagePath
      };
        // const id = responseData.postId;
        // post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: String, title: String, content: String, image: File | String){
    let postData: Post | FormData| any;
    if(typeof(image) === 'object'){
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    }
    else{
      postData = {id: id, title: title, content: content, imagePath: image}
    }

    // const post: Post = {id: id, title: title, content: content, imagePath:null};
    this.http.put('http://localhost:3000/api/posts/'+id, postData)
    .subscribe(response=>{
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex( p=> p.id === id);
      const post: Post = {
          id: id,
          title: title,
          content: content,
          imagePath: ''
        // imagePath: response.imagePath
      };
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
