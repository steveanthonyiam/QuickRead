import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  articles: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        let url = params["url"];

        this.getNews().subscribe(r => {
          console.log(r);
          this.articles = r;

        })
      }
      );
  }

  format(content: string) {
    content = content.replace(/\n/g, '<br><br>')
    content = content.replace(/\\n/g, '<br><br>')
    return content;
  }

  ngOnInit(): void {
  }

  getNews(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/examples/search.json")
  }

}
