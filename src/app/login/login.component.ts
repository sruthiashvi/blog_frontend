import { Component, OnInit,OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

interface TokenObj{
  token:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username:any;
  uname:any;
  firstname:any;
  uemail:any;
  login:[];
  uid:any;


  User: any;
  selected_user={username:'',mobile:'',email:'',password:''};
  constructor(private Cookie:CookieService,private fb: FormBuilder, private apiService:ApiService,private cookieService:CookieService,private router:Router,private data:DataService,private toast:ToastrService) {
   }
   
 ngOnInit() {
     this.loginForm = new FormGroup({
       mobileInput: new FormControl(null,Validators.required),
       passwordInput: new FormControl(null, Validators.required),       
     });
     setTimeout(() => this.toast);
     const token = this.cookieService.get('usr_token');
      if(token){
        this.router.navigate(['/dashboard']);
}

 }
onSubmit(): void{

  //console.log(this.loginForm.value);
  this.apiService.loginUser({username:this.loginForm.value.mobileInput,password:this.loginForm.value.passwordInput}).subscribe(
  (data: TokenObj) => {
    this.Cookie.set('usr_token',data.token);
    this.Cookie.set('uname',this.loginForm.value.mobileInput)
    this.toast.success("You'll be redirected to your dashboard",'Login Successful!',{
      easing: 'ease-in',
      timeOut: 2000,
      progressAnimation:'increasing',
      progressBar: true,
      tapToDismiss:true,
    });

    this.Cookie.set('usr_token',data.token);
    setTimeout(() => {
      location.href="/dashboard";
    }, 2000);
    
    },
  error => {
    if(error.error.non_field_errors)
         {
            this.toast.error(error.error.non_field_errors,"Invalid Credentials!",{
              easing: 'ease-in',
              timeOut: 2000,
              progressAnimation:'decreasing',
              progressBar: true,
              tapToDismiss:true,
            });
         }  
         setTimeout(() => {
          this.router.navigateByUrl('/login');
      }, 2000);
  }
  );
  this.apiService.getUser(this.loginForm.value.mobileInput).subscribe(data => {
    this.User = data;
    console.log("hiii")
    this.uemail=this.User.email;
    this.Cookie.set('uemail',this.User.email);
    this.Cookie.set('uid',this.User.id)
   
  })
  }    
get passwordInput() { return this.loginForm.get('passwordInput'); }

get mobileInput() { return this.loginForm.get('mobileInput'); }

}
