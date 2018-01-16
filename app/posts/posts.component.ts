import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
posts: any = [];
_parseInt=parseInt;
offset: any;
private user:any=null;
months: any=['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
  constructor(private postsService: PostsService) { }
getLikes(id,event)
{
event.preventDefault();
var data;

this.postsService.getLikes(id).subscribe(datas => {
      data = datas;
    });
var faLikes=document.getElementById('fa_likes'+id);
faLikes.innerText=data.count;
}
getUser(){return this.user;}
load_full_text(event) {
        event.preventDefault();
var href:string;
var fulltext:HTMLElement;
var teaser:HTMLElement;
var postStart:HTMLElement;
var stayHere:number=event.target.getBoundingClientRect().bottom+ pageYOffset;

href=event.target.getAttribute("href");
fulltext=document.getElementById("fulltext_"+href);
teaser=document.getElementById("teaser_"+href);
postStart=document.getElementById("post_start"+href);
       if(event.target.id=='full_text_up'){
       fulltext.style.display='none';
       teaser.style.display='block';
        
       event.target.id='full_text_down';
         event.target.innerText='Читать текст полностью';
      event.target.scrollIntoView();
    }
    else if(event.target.id=='full_text_down'){
        fulltext.style.display='block';
       teaser.style.display='none';
        event.target.id='full_text_up'
         event.target.innerText='Свернуть';
        //window.scrollTo(11,stayHere);
       postStart.scrollIntoView();
    }
}
  ngOnInit() {

this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts.data;
      this.offset=posts.offset;
      console.log(this.posts);
      let arr:any=[];
     this.posts.forEach(function(item){
     arr[item._id]=item;
     })
     console.log(arr);
    });
      
      this.user = this.postsService.getUser();
  
  }

}
