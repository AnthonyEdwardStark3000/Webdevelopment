import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/post.model';
import { PostsService } from '../posts.service';


@Component({
  templateUrl:'./post-create.component.html',
  selector:'<app-post-create></app-post-create>',
  styleUrls:['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  enteredTitle ='';
  enteredContent ='';
  private mode = 'create';
  private postId: String | null |undefined;
  private post: Post | null | undefined;

  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
         this.mode = 'edit';
         this.postId = paramMap.get('postId');
         this.post = this.postsService.getPost(this.postId);
      }
        else
      {
          this.mode = 'create';
          this.postId = '';
      }
    });
  }

   OnAddPost(form: NgForm){
     if(form.invalid)
     {
       return;
     }
    const post: Post = {
      title: form.value.title, content: form.value.content,
      id: '',
    };
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
