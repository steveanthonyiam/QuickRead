import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        let url = params["url"];

        this.getNewsContent(url).subscribe(r => {
          console.log(r);
          this.data = r;

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

  getNewsContent(url: string): Observable<any> {
    return this.http.get<any>("http://localhost:3000/economist/get?url=" + url)
  }

}
