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
  @ViewChild("search") search: ElementRef;
  constructor(
    private http: HttpClient,
    private util: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isShow = true;
  playView = {};
  ngOnInit() {
    this.init();
    this.http.get("http://47.105.150.105/m-api/banner").subscribe(res => {
      if (res["code"] !== 200) {
        this.util.message("请求失败,请联系管理员", false, 3000);
      } else {
        this.slides = res && res["banners"];
      }
    });
    if (this.router.url.includes("singlist")) {
      this.isShow = false;
    }
    this.route.queryParams.subscribe(res => {
      this.currentId = res.songId;
      this.audio.nativeElement.src =
        "https://music.163.com/song/media/outer/url?id=" + res.songId + ".mp3";
      this.audio.nativeElement.load();
      let playPromise = this.audio.nativeElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.audio.nativeElement.play();
            this.playState = true;
          })
          .catch(() => {});
      }
      let id =
        (this.route.children &&
          this.route.children[0] &&
          this.route.children[0].snapshot &&
          this.route.children[0].snapshot.params.id) ||
        2859214503;
      this.http
        .get("http://47.105.150.105/m-api/playlist/detail?id=" + id)
        .subscribe(result => {
          this.listOfData = result["playlist"]["tracks"];
          this.playView = result["playlist"]["tracks"].find(item => {
            return item.id == res.songId;
          });
        });
      if (res.hasOwnProperty("id")) {
        let id = res.id;
        this.http
          .get("http://47.105.150.105/m-api/artists?id=" + id)
          .subscribe(result => {
            this.listOfData = result["hotSongs"];
            this.playView = result["hotSongs"].find(item => {
              return item.id == res.songId;
            });
          });
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
  playState = false;
  soundHide = false;
  testSwiper: Swiper;
  detailHide = true;
  currentId: number;
  listOfData;
  songs;
  slides = [];
  backgroundcolor: [];
  disabled = false;
  showSearch = false;
  playlists;
  artists;
  currentIndex;
  change(e) {
    // console.log(e)
  }
  init() {
    this.soundHide = false;
    this.detailHide = false;
  }
  showSwiper(e) {
    if (e.target.innerHTML === "我的音乐") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
  move(e) {
    if (this.audio.nativeElement.paused) {
      if (!this.audio.nativeElement.duration) {
        return;
      }
    }
    let process = document.getElementsByClassName("son")[0];
    let offset = document.getElementsByClassName("process")[0];
    let rect = document
      .getElementsByClassName("process")[0]
      .getBoundingClientRect();
    //按钮相对盒子的距离
    let marWidth = e.clientX - rect.left;
    process.setAttribute("style", `width: ${marWidth}px`);
    this.audio.nativeElement.currentTime =
      (marWidth / offset["offsetWidth"]) * this.audio.nativeElement.duration;
  }
  paused(e) {
    e.stopPropagation();
    if (this.playState) {
      this.audio.nativeElement.pause();
      this.playState = false;
    } else {
      this.audio.nativeElement.play();
      this.playState = true;
    }
  }
  changeSound() {
    this.soundHide = !this.soundHide;
  }
  showDetail() {
    this.detailHide = !this.detailHide;
  }
  volume(e) {
    let vbg = document.getElementById("vbg");
    let Volume = document.getElementById("curVolume");
    let curVolume = vbg.getBoundingClientRect().bottom - e.clientY;
    Volume.setAttribute("style", `height: ${curVolume}px`);
    this.audio.nativeElement.volume =
      Math.floor((curVolume / vbg.clientHeight) * 100) / 100;
  }
  searchKey(e) {
    let keywords = this.search.nativeElement.value;
    if (keywords === "") {
      return;
    }
    this.http
      .get("http://47.105.150.105/m-api/search/suggest?keywords=" + keywords)
      .subscribe(res => {
        this.artists = res["result"] && res["result"]["artists"];
        this.playlists = res["result"] && res["result"]["playlists"];
      });
    this.http
      .get("http://47.105.150.105/m-api/search?keywords=" + keywords)
      .subscribe(res => {
        this.songs = res["result"]["songs"];
      });
  }
  config() {
    this.showSearch = false;
    this.artists = [];
    this.playlists = [];
    this.songs = [];
    this.search.nativeElement.value = "";
  }
  show(e) {
    e.stopPropagation();
    this.showSearch = true;
  }
  playsong(song) {
    let id = song.id;
    this.playView = {
      name: song.name,
      ar: [
        {
          name: song.artists && song.artists[0]["name"]
        }
      ],
      al: {
        picUrl: song.artists && song.artists[0]["img1v1Url"]
      }
    };
    this.audio.nativeElement.src =
      "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
    this.audio.nativeElement.load();
    let playPromise = this.audio.nativeElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.audio.nativeElement.play();
          this.playState = true;
        })
        .catch(() => {});
    }
  }
  
  next(type) {
    let id
    this.currentId = this.playView && this.playView["id"];
    this.currentIndex = this.listOfData.findIndex((item, index) => {
      return item.id == this.currentId;
    });
    // console.log(this.currentId,this.currentSong)
    if(type === 'next'){
      if (this.currentIndex < this.listOfData.length - 1) {
        id = this.listOfData[this.currentIndex + 1]['id']
      } else {
        id = this.listOfData[this.currentIndex]['id']
      }
    }else{
      if (this.currentIndex > 0) {
        id = this.listOfData[this.currentIndex - 1]['id']
      } else {
        id = this.listOfData[this.currentIndex]['id']
      }
    }
    this.currentId = id
    this.playView = this.listOfData.find(item => {
      return item.id === id
    })
    this.audio.nativeElement.src =
      "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
    this.audio.nativeElement.load();
    let playPromise = this.audio.nativeElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.audio.nativeElement.play();
          this.playState = true;
        })
        .catch(() => {});
    }
  }
}
