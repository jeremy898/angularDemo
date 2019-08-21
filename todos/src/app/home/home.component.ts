import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import Swiper from 'swiper';
// import { error } from '@angular/compiler/src/util';
import {UtilsService} from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http : HttpClient,private util :UtilsService,private route:ActivatedRoute,private router: Router) { }

  isShow = true
   ngOnInit() {
      this.http.get('http://47.105.150.105/m-api/banner').subscribe(res => {
      // console.log(res['banners'])
      this.slides = res && res['banners']
      // if(res['code'] !== 200){
      //   this.util.message('请求失败,请联系管理员', false, 3000); 
      // }else{
      //   console.log(res['banners'].map(item => {
      //     return item.imageUrl
      //   }))
      // }
    })
    if(this.router.url.includes('singlist')){
      this.isShow = false
    }
  }
  testSwiper: Swiper;
    slides = []
    backgroundcolor:[];
    disabled = false;
    value1 = 30;
    value2 = [20, 50];
  change(e){
    // console.log(e)
  }
  init(){
    
  }
  showSwiper(e){
    if(e.target.innerHTML === '我的音乐'){
      this.isShow = false
    }else{
      this.isShow = true
    }
  }
}
