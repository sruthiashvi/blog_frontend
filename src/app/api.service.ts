import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "./loginapp";
import {Post} from './postapp';
import {Comment} from './commentapp';
import {Img} from './imageapp';

import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: "root"
})
export class ApiService {
  new:any;
  constructor(private http: HttpClient,private cookieService:CookieService) {}
  private baseURL = "http://localhost:8000/";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });


  loginUser(authData){
    const body= JSON.stringify(authData);
    return this.http.post(this.baseURL + 'auth/',body,{headers:this.httpHeaders});
    }
    token=this.cookieService.get('usr_token');
    getAuthHeaders(){
    return new HttpHeaders({
    'content-type':'application/json',
    Authorization:`Token${this.token}`
    })
    }
    registerUser(userData){
    console.log(userData);
    const body =JSON.stringify(userData);
    return this.http.post(this.baseURL + 'api/users/',body,{headers: this.httpHeaders});
    }
    getUser(x):Observable<Login[]>{
      return this.http.get<Login[]>(this.baseURL + 'api/userbynum/'+x+'/',{headers:this.httpHeaders});
      console.log(x);
    }
    getpost(): Observable<Post[]> {
      return this.http.get<Post[]>(this.baseURL + "api/posts/", {
        headers: this.httpHeaders
      });
    }
    getimage(uid): Observable<Img[]> {
      return this.http.get<Img[]>(this.baseURL + "api/profile/"+uid+"/", {
        headers: this.httpHeaders
      });
    }
    getcomment(): Observable<Comment[]> {
      return this.http.get<Comment[]>(this.baseURL + "api/comments/", {
        headers: this.httpHeaders
      });
    }
    //  getcommentbyid(x): Observable<Comment[]> {
    //    return this.http.get<Comment[]>(this.baseURL + "api/comments/", {
    //      headers: this.httpHeaders
    //    });
    //  }
    addpost(author,subject,content,pdate,ptime): Observable<Post[]> {
      const body = {author:author,subject:subject,content:content,pdate:pdate,ptime:ptime};
      return this.http.post<Post[]>(this.baseURL + "api/posts/", body, {
        headers: this.httpHeaders
      });
      location.reload()
    }
    addprofile(x): Observable<any[]> {
      const body = {user:x};
      return this.http.post<any[]>(this.baseURL + "api/profile/", body, {
        headers: this.httpHeaders
      });
    }
    addcomment(comment,pid,postedby,x,y): Observable<Comment[]> {
      const body = {comment:comment,pid:pid,postedby:postedby,cdate:x,ctime:y};
      return this.http.post<Comment[]>(this.baseURL + "api/comments/", body, {
        headers: this.httpHeaders
      });
    }
    deletepost(id):Observable<Post[]>{
      return this.http.delete<Post[]>(this.baseURL+'api/postsbyid/'+id+'/',{
        headers:this.httpHeaders
      });
    }
    getpostdetails():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseURL+ 'api/postsbyid/',{
        headers:this.httpHeaders
      });
    }
    setpostdetails(id,subject,content,author,date,time):Observable<Post[]>{
      const body={subject:subject,content:content,author:author,pdate:date,ptime:time};
      return this.http.put<Post[]>(this.baseURL+'api/postsbyid/'+id+'/',body,{headers:this.httpHeaders});
    }
    changepic(id,file){
      const fd=new FormData();
      fd.append('image',file,file.name);
      return this.http.patch(this.baseURL+'api/profile/'+id+'/',fd)
    }


}
