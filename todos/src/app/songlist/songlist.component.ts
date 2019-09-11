import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.css']
})
export class SonglistComponent implements OnInit {
  constructor(private http:HttpClient,private route:ActivatedRoute,private router: Router) { }
  playlist : {};
  listOfData = [];
  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.http.get('http://47.105.150.105/m-api/playlist/detail?id='+id).subscribe(res =>{
      this.playlist = res['playlist']
      this.listOfData = res['playlist']['tracks']
    })
  }
  play(id){
    let songid = id.id
    this.router.navigate([`home/singlist/${this.route.snapshot.params.id}`], {
      queryParams: {
         songId:songid
      }
    })
  }
}
