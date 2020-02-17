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
    })
    this.http.get('http://140.143.128.100:3000/personalized').subscribe(res => {
      this.songList = res['result']
    })
  }
}
