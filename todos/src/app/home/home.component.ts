import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  ViewChild
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import Swiper from "swiper";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("audio") audio: ElementRef;
  // @ViewChild('play') playbox: ElementRef;
  constructor(
    private http: HttpClient,
    private util: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isShow = true;
  playView = {};
  ngOnInit() {
    const _this = this;
    this.playState = false;
    this.soundHide = false;
    this.http.get("http://47.105.150.105/m-api/banner").subscribe(res => {  
      if(res['code'] !== 200){
        this.util.message('请求失败,请联系管理员', false, 3000);
      }else{
        this.slides = res && res["banners"];
      }
    });
    if (this.router.url.includes("singlist")) {
      this.isShow = false;
    }
    this.route.queryParams.subscribe(res => {
      this.audio.nativeElement.src =
        "https://music.163.com/song/media/outer/url?id=" + res.songId + ".mp3";
      this.audio.nativeElement.load();
      let playPromise = this.audio.nativeElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.audio.nativeElement.play();
            this.playState = true
          })
          .catch(() => {});
      }

      let id = this.route.children[0].snapshot && this.route.children[0].snapshot.params.id || 2859214503;
      this.http.get("http://47.105.150.105/m-api/playlist/detail?id=" + id).subscribe(result => {
          this.playView = result["playlist"]["tracks"].find(item => {
            return item.id == res.songId;
          });
        });
        if(res.hasOwnProperty('id')){
            let id = res.id
            this.http.get('http://47.105.150.105/m-api/artists?id='+ id).subscribe(result => {
               this.playView = result["hotSongs"].find(item => {
                return item.id == res.songId;
              })
            })
        }
    });
    this.audio.nativeElement.ontimeupdate = function() {
      let process = document.getElementsByClassName("son")[0];
      // console.log('播放中')
      // 视频当前时间 / 视频总时长 变成百分比
      let perWidth = (this.currentTime / this.duration) * 100 + "%";
      process.setAttribute("style", `width: ${perWidth}`);
    };
  }
  playState = false
  soundHide = false;
  testSwiper: Swiper;
  slides = [];
  backgroundcolor: [];
  disabled = false; 
  value1 = 30;
  value2 = [20, 50];
  change(e) {
    // console.log(e)
  }
  init() {}
  showSwiper(e) {
    if (e.target.innerHTML === "我的音乐") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
  move(e) {
    console.log(this.playView)
    let process = document.getElementsByClassName("son")[0];
    let offset = document.getElementsByClassName("process")[0];
    let rect = document.getElementsByClassName("process")[0].getBoundingClientRect();
    //按钮相对盒子的距离
    let marWidth = e.clientX - rect.left;
    process.setAttribute("style", `width: ${marWidth}px`);
    this.audio.nativeElement.currentTime =
      (marWidth / offset["offsetWidth"]) * this.audio.nativeElement.duration;
  }
  paused(e) {
    e.stopPropagation();
    if(this.playState){
      this.audio.nativeElement.pause();
      this.playState = false
    }else{
      this.audio.nativeElement.play();
      this.playState = true
    }
  }
  changeSound(){
    this.soundHide = !this.soundHide
    // this.audio.nativeElement.volume
  }
  volume(e){
    let vbg = document.getElementById('vbg')
    // let soundContorl = document.getElementById('soundBtn')
    let Volume = document.getElementById('curVolume')
    console.log(vbg.getBoundingClientRect().top)
    console.log(e.clientY)
    console.log('---')
    // let curVolume = e.clientY - vbg.getBoundingClientRect().top
    // console.log(curVolume)
    // Volume.setAttribute("style", `height: ${curVolume}px`);
  }
}
