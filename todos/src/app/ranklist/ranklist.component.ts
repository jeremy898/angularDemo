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
    this.http.get('http://47.105.150.105/m-api/toplist/detail').subscribe(res => {
      console.log(res)
      this.rankList = res['list']
      console.log(this.rankList)
    })
  }

}
