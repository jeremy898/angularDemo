import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,private router: Router) { }

  songList:any = []
  
  ngOnInit() {
    this.http.get('../../assets/list.json').subscribe(res =>{
      // console.log(res)
    })
    this.http.get('http://47.105.150.105/m-api/personalized').subscribe(res => {
      this.songList = res['result']
    })
  }
  // redirectTo(item){
  //   console.log(item)
  //   this.router.navigate
  // }
}
