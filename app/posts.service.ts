import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {
private count: number=0;
user:any;

  constructor(private http: Http) { }

getAllPosts() {

    return this.http.get('angular/posts/1/1')
      .map(res => res.json());
  }
getCalendarLinks(body: any) {

    return this.http.post('angular/posts/get_links',body)
      .map(res => res.json());
  }
loadUser()
{
this.user=this.http.get('angular/loadUser')
      .map(res => res.json());

      
}
getLikes(id)
{

var data:string='post_id='+id;
return this.http.post('/angular/get_likes', data).map(res => res.json());
}
getTags()
{
return this.http.get('angular/get_tags')
      .map(res => res.json());
}

lastCom()
{
return this.http.get('angular/lastcomments')
      .map(res => res.json());
  //return [{"post":"lol", "_id":"1","post._id":"1"},{"post":"lol", "_id":"1","post._id":"1"},{"post":"lol", "_id":"1","post._id":"1"}];
}
getUser()
{
return this.user;



}
}
