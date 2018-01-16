import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
links: any = [];
  constructor(private postsService: PostsService) { }
Calendar3(id: string, year: number, month: number) {
        var Dlast = new Date(year,month+1,0).getDate(),
            D = new Date(year,month,Dlast),
            DNlast = D.getDay(),
            DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
            calendar = '<tr>';
            const m =  <HTMLOptionElement>document.querySelector('#'+id+' option[value="' + D.getMonth() + '"]');
            const g =  <HTMLInputElement>document.querySelector('#'+id+' input');
           
       var data = new FormData();
        data.append('year', year);
        data.append('month', month);
        data.append('last', Dlast);
        this.postsService.getCalendarLinks(data).subscribe(links => {
      this.links = links;
    });
   
                if (DNfirst != 0) {
                    for (var i = 1; i < DNfirst; i++) calendar += '<td>';
                } else {
                    for (var i = 0; i < 6; i++) calendar += '<td>';
                }
                for (var i = 1; i <= Dlast; i++) {
                    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                        calendar += '<td class="today">';
                        if (this.links.indexOf(i) != '-1') calendar += '<a href="/posts/date/' + year + '-' + (month+1) + '-' + i + '">' + i + '</a></td>';
                    else calendar+=i+'</td>'
                    } else {
                       if (this.links.indexOf(i) != '-1') calendar += '<td class="ispost">' + '<a href="/posts/date/' + year + '-' + month + '-' + i + '">' + i + '</a></td>';
                        else calendar += '<td>'  + i + '</td>';
                    }

                    if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                        calendar += '<tr>';
                    }
                }
                for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
                document.querySelector('#' + id + ' tbody').innerHTML = calendar;
                g.value = String(D.getFullYear());
                m.selected = true;
                if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
                    document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
                }
               //var redel: HTMLElement= document.querySelector('#' + id + ' option[value="' + new Date().getMonth() + '"]').style.color = 'rgb(220, 0, 0)'; // в выпадающем списке выделен текущий месяц    
      }
      
      Kalendar3() {
      const inp=<HTMLInputElement>document.querySelector('#calendar3 input');
      const sel=<HTMLSelectElement>document.querySelector('#calendar3 select');
      
     
        this.Calendar3("calendar3",Number(inp.value),Number(sel.options[sel.selectedIndex].value));
  
  }
  ngOnInit() {
 
  this.Calendar3("calendar3",new Date().getFullYear(),new Date().getMonth());
}
   

}
