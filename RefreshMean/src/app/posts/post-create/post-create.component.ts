import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/post.model';
import { PostsService } from '../posts.service';


@Component({
  templateUrl:'./post-create.component.html',
  selector:'<app-post-create></app-post-create>',
  styleUrls:['./post-create.component.scss']
})
export class PostCreateComponent{
  enteredTitle ='';
  enteredContent ='';
  
  constructor(public postsService: PostsService){}

   OnAddPost(form: NgForm){
     if(form.invalid)
     {
       return;
     }
    const post: Post = { title: form.value.title, content : form.value.content };
    this.postsService.addPost(post);
    form.resetForm();
  }

}
