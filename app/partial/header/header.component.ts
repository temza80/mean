import { Component, OnInit } from '@angular/core';
declare var $ :any;

import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user: any;
unemail: any=null;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
this.postsService.getUser().subscribe(user => {this.user=user});

}
}
