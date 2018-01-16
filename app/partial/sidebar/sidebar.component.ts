import { Component,ElementRef, OnInit } from '@angular/core';
declare var $ :any;

import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
skyTag:string='';
tagList:string='';

comments: any = [];
user:any;//как то надо заглобалить
  constructor(private postsService: PostsService, private elementRef: ElementRef) { }
tagToLine(event)
{

    event.preventDefault();
    let target=event.target;
  
     
      if (target.tagName != 'A') return;
    var tags_line=$(target).parent().siblings(".tags_line");

    tags_line.html(tags_line.html()+'<span style="padding-left:5px">|'+target.innerText+'</span>');
 


} 
getTags()
{
function findFontSize(data)
{
    var max=0;
     data.forEach(function(item, i, arr) {
        if(parseInt(item.weight)>max) max=item.weight;
            })
   
            return 16/max;
}
this.postsService.getTags().subscribe(data => {
 var  sizeDelim=findFontSize(data);
      data.forEach(function(item, i, arr) {    
var fontSize=parseInt(item.weight)*sizeDelim;
if(fontSize<12)  fontSize=12;

this.tagList+="<a href='#' style='font-size: "+fontSize+"px'>"+item.tag+'</a>';
this.skyTag+="<a href='/posts/tag/"+item.tag+"' style='font-size: "+fontSize+"px'>"+item.tag+'</a>';

},this);
  });
  let elem=this.elementRef.nativeElement.querySelector('.tag_list');
 let that=this;
 // elem.onclick=function(event){that.tagToLine(event)}
$(elem).on("click","a",function(event){that.tagToLine(event)});
}
showSearch(event)
{
var that=event.target;
$('#many_tags').toggle( "fast", function() {});
var  close= "Развернуть поиск по нескольким тегам"+String.fromCharCode(0x25BC); 
var  open="Свернуть"+String.fromCharCode(0x25B2);
if(that.innerText==close) that.innerText=open; else that.innerText=close; 
}
tagSearchSubmit()
{
   $('#input_tags').val($('#search_tags_line').text());
    $("#tags_form").submit();
}
clearTags(event)
{
var that=event.target;
//$(that).siblings(".tags_line").text('Теги:');
$("#search_tags_line").text('Теги:');
    return false;
}

  ngOnInit() {
  
  this.getTags();
      
      this.user = this.postsService.getUser();
   // this.comments=this.postsService.lastCom();
    this.postsService.lastCom().subscribe(comments => {
      this.comments=comments;
  });
  }

}
