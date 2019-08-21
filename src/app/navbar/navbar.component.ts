import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  uname;
  isloggedin:boolean=false;
  user_data:any;
	testForm: FormGroup;
	  optionsSelect = [
	    { value: '1', label: 'Option 1' },
	    { value: '2', label: 'Option 2' },
	    { value: '3', label: 'Option 3' },
	  ];
  constructor(private Cookie:CookieService) {
    user_data:Cookie;
    console.log(this.isloggedin)
    this.uname=this.Cookie.get('uname');
    this.isloggedin=this.Cookie.check('uname');
   }

  ngOnInit() {
    this.testForm = new FormGroup({
      testSelect: new FormControl('1')
    });
    this.uname=this.Cookie.get('uname');
    this.isloggedin=this.Cookie.check('uname');
    console.log("navbar")
    console.log(this.isloggedin)

}
}