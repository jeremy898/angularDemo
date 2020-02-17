import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.css']
})
export class RanklistComponent implements OnInit {
  rankList: []
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://140.143.128.100:3000/toplist/detail').subscribe(res => {
      this.rankList = res['list']
    })
  }

}
