import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: any;

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/economist/top")
  }

  ngOnInit(): void {

    this.getNews().subscribe(n => {
      this.news = n.itemListElement;
      console.log(n);
    });
  }

  getLink(url: string) {
    url = url.replace('https://www.economist.com/', "");
    url = url.replace("/", "---");
    url = "/read?url=" + url;
    return url;
  }

}
