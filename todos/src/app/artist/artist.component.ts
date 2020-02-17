import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,private router: Router) { }
  listOfData = [];
  playlist = {}
  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      let id = res.id
      this.http.get('http://140.143.128.100:3000:3000/artists?id='+ id).subscribe(result => {
        this.listOfData = result['hotSongs']
        this.playlist = result['artist']
      })
    })  
  }
  play(id){
    let songid = id.id
    this.router.navigate(['home/artist'], {
      queryParams: {
         id:this.route.snapshot.queryParams.id,
         songId:songid
      }
    })
  }
} 
