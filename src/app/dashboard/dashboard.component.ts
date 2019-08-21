import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import{Post} from '../postapp';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {
  uname:any;
  uemail:any;
  post:any;
 postform:FormGroup;
 commentform:FormGroup;
 pdate=Date.now()
 pdate1:any;
 ptime=new Date()
 ptime2=this.ptime.getTime()
 ptime3:any;
 comment:any;
 comments:any;
 pid:any;
 selectedid: any;
 edit:boolean=false;
 post1:any;
 changedcontent:any;
 postcontent:any;
 thisid:any;
 color:boolean=false;
 image:any;
 uid:any;
 author;
 

 getpid(x){
  this.selectedid=x
  this.getcomment()
}
  returnuname()
  {
    return this.uname
  }
  constructor(private data:DataService,private apiService:ApiService,private Cookie:CookieService,private datapipe:DatePipe) {
     this.getpost()
     
   }

  ngOnInit() {
    this.postform = new FormGroup({
      subject: new FormControl(null, Validators.required),
      content:new FormControl(null,Validators.required)
    });
    this.commentform = new FormGroup({
      comment: new FormControl(null, Validators.required)
    });
   this.uname=this.Cookie.get('uname');
   this.uemail=this.Cookie.get('uemail');
   this.uid=this.Cookie.get('uid');
   this.pdate1=this.datapipe.transform(this.pdate,'dd-MM-yyyy')
   this.ptime3=this.datapipe.transform(this.ptime2,'hh-mm-ss a')
   console.log(this.pdate1)
   console.log(this.ptime3)
   console.log(this.uid)
   this.getimage()
   
  }
  get subject() { return this.postform.get('subject'); }
  get content() { return this.postform.get('content'); }
  getpost() {
    this.apiService.getpost().subscribe(data => (this.post = data));
  }
  getimage() {
    this.apiService.getimage(this.uid).subscribe(data => (this.image = data,console.log(this.image)));
    console.log(this.image)
  }

  getcomment() {
    this.apiService.getcomment().subscribe(data => (this.comment = data));
   }
  createpost() {
  
    this.apiService.addpost(this.uname,this.postform.value.subject,this.postform.value.content,this.pdate1,this.ptime3).subscribe(data =>(this.getpost(),location.reload()));
    location.href='/dashboard';
  }
  createcomment(y){
    this.apiService.addcomment(this.commentform.value.comment,y,this.uname,this.pdate1,this.ptime3).subscribe(data => (this.getcomment(),this.getpost()));
   this.pid=y;
   this.getpost();
  }
  deletepost(x){
    this.apiService.deletepost(x).subscribe(data => this.getpost());
    location.href='/dashboard';
    
  }
  getpostdetails() {
    this.apiService.getpostdetails().subscribe(data => (this.post1 = data));
  }
 
  updatepost(id,subject){
    this.changedcontent=this.postcontent
    this.apiService.setpostdetails(id,subject,this.changedcontent,this.uname,this.pdate1,this.ptime3).subscribe(data=>this.getpostdetails());
    location.reload();
  }
  editpost(x,y){
    this.thisid=x;
    this.edit=true;
    this.postcontent=y;
    console.log("in edit")
    console.log(this.postcontent)
  }
  fav(id){
    this.thisid=id;
    this.color=true;
    console.log(this.color)
  }
  getfile(){
    var file=document.getElementById('propic').files[0];
    this.apiService.changepic(this.uid,file).subscribe(data=>(location.reload()));
  }
  editclick()
  {
    var ele=document.getElementById('propic');
    ele.click();
  }
getauthor(x){
  this.author=x;
  console.log(this.author)
}

}
