import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService:CookieService,private toast:ToastrService) { }

  ngOnInit() {
    this.onLogout();
    }
    onLogout(){
    this.cookieService.delete('usr_token');
    this.cookieService.delete('csrftoken');
    this.cookieService.delete('uname');
    this.cookieService.delete('firstname');
    this.cookieService.delete('uemail');
    this.toast.success("You'll be automatically redirected to Home page","Successfully loggedout",{
      easing: 'ease-in',
      timeOut: 2000,
      progressAnimation:'decreasing',
      progressBar: true,
      tapToDismiss:true,
    });
    setTimeout(() => {
      location.href='/'
  }, 2000);
    }
      
    }

  
