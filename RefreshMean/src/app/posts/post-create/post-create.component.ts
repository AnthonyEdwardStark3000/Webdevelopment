import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  private mode = '';
  private postId: any;
  public post: Post | any;
  form: FormGroup | any;
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      'title': new FormControl(null,
         {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null,
         {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
         this.mode = 'edit';
         this.postId = paramMap.get('postId');
         // Spinner start
          this.isLoading = true;
          //  this.post =
          this.postsService.getPost(this.postId).subscribe(postData =>{
           this.isLoading = false;
           // Spinner end
           this.post = {id: postData._id, title: postData.title, content: postData.content};
          this.form.setValue({'title': this.post.title, 'content': this.post.content});
          });
      }
        else
      {
          this.mode = 'create';
          this.postId = '';
      }
    });
  }

   OnSavePost(){
     if(this.form.invalid)
     {
       return;
     }
     this.isLoading = true;
     if(this.mode === 'create')
     {
       this.postsService.addPost(this.form.value.title, this.form.value.content);
       console.log("Create");
     }
      else
      {
        this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
        console.log("update");
      }
    const post: Post = {
      title: this.form.value.title, content: this.form.value.content,
      id: '',
    };
    this.postsService.addPost(this.form.value.title, this.form.value.content);
    this.form.reset();
  }

}
