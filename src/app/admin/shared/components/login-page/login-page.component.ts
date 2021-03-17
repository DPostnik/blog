import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import {User} from "../../../../shared/interfaces/interfaces";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  message: string = '';
  form: FormGroup;
  loaded: boolean = true;

  constructor(
              public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      ( params: Params)=> {
        if(params['loginAgain']){
          this.message = "Введите данные ещё раз";
        }
        if(params['authFailed']) {
          this.message ="Время сессии истекло, введите данные ещё раз";
        }
      }
    )
    this.form = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this.loaded = false;

    const user: User = {
        email: this.form.value.email,
        password: this.form.value.password
      }

    this.auth.login(user).subscribe( () => {
        this.form.reset();
        this.router.navigate(['/admin','dashboard']);
        this.loaded = true;
      },
      () =>{
        this.loaded = true
    }
    )
  }
}
