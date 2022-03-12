import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/post.model';
import { PostsService } from '../posts.service';
import { mimeType } from'./mime-type.validator';


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
  imagePreview: any |string | undefined;


  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {
      validators: [Validators.required]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
      })
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

  onImagePicked(event: Event) {
    // const file: any = (event.target as HTMLInputElement).files[0]; to select first file from the array of files.
    const file = (event.target as HTMLInputElement).files![0]; //to select the first file from the array of files but not null.
    // console.log(file);
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // onImagePicked(event: Event) {
  //     const file = (event.target as HTMLInputElement).files[0];
  //     this.form.patchValue({ image: file });
  //   this.form.get("image").updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(file);
  // }


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
