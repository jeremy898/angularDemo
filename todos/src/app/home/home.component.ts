import { Component, OnInit,Input, Output,ElementRef,ViewChild} from '@angular/core';
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
  @ViewChild('audio') audio: ElementRef;
  constructor(private http : HttpClient,private util :UtilsService,private route:ActivatedRoute,private router: Router) { }

  isShow = true
  playView:{}
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
    this.route.queryParams.subscribe(res => {
      this.audio.nativeElement.src ='https://music.163.com/song/media/outer/url?id='+ res.songId +'.mp3'
      this.audio.nativeElement.play()
      let id = this.route.children[0].snapshot.params.id
      this.http.get('http://47.105.150.105/m-api/playlist/detail?id='+id).subscribe(result =>{
        this.playView = result['playlist']['tracks'].find(item => {
          return item.id == res.songId
        })
      })
    })
    this.audio.nativeElement.ontimeupdate = function () {
      let process = document.getElementsByClassName('son')[0]
      console.log('播放中')
      console.log(this.currentTime,this.duration)
      //就可以计算当前的进度条了 =  视频当前时间 / 视频总时长 变成百分比
      let perWidth = this.currentTime / this.duration * 100 + "%";
      process.setAttribute('style',`width: ${perWidth}px`)
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
  move(e){
    let process = document.getElementsByClassName('son')[0]
    let rect = document.getElementsByClassName('process')[0].getBoundingClientRect()
    console.log(process)
    //按钮相对盒子的距离
    let marWidth = e.clientX - rect.left
    console.log(marWidth)
    process.setAttribute('style',`width: ${marWidth}px`)
  }
  paused(e){
    e.stopPropagation()
    this.audio.nativeElement.pause()
    console.log('暂停')
  }
}
