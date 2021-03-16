import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../../../shared/services/post.service";
// @ts-ignore
import {Post} from "../../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private post: PostService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      author: new FormControl(null,[Validators.required]),
      text: new FormControl(null,[Validators.required])
    })
  }

  submit(){
    if(this.form.invalid) {
      return;
    }

    const post: Post = {
      text: this.form.value.text,
      author: this.form.value.author,
      title: this.form.value.title,
      date: new Date()
    }

    this.post.addPost(post)
      .subscribe(() => {
        this.form.reset();
      })

  }

}
