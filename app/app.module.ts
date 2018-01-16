import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { CalendarComponent } from './partial/calendar/calendar.component';
import { SidebarComponent } from './partial/sidebar/sidebar.component';
import { HeaderComponent } from './partial/header/header.component';
import {MyGuard} from './my.guard'
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'prefix'
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [MyGuard]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CalendarComponent,
    SidebarComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
RouterModule.forRoot(ROUTES) 
  ],
  providers: [PostsService,MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
