import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
  })

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
  }

  userLogin() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(res => {
        console.log(res);
        localStorage.setItem("token",res.token);
        //keep in mind to change listing to home
        this.router.navigate(["/home"])
        
      }, 
      err => {
        console.log(err);        
      })
    }
  }

}
