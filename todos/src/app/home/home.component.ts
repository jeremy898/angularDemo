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
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("audio") audio: ElementRef;
  @ViewChild("search") search: ElementRef;
  @ViewChild("lyric") lyric: ElementRef;
  @ViewChild("curlyric") curlyric: ElementRef;
  constructor(
    private http: HttpClient,
    private util: UtilsService,
    private route: ActivatedRoute,
    private router: Router
    ) {}
    playState = false;
    soundHide = false;
    detailHide = true;
    currentId: number;
    listOfData = [];
    songs;
    slides = [];
    backgroundcolor: [];
    disabled = false;
    showSearch = false;
    playlists;
    artists;
    currentIndex;
    isShow = true;
    playView = {};
    lyricList =[]
  ngOnInit() {
    //页面初始加载
    this.init();
    this.http.get("http://47.105.150.105/m-api/banner").subscribe(res => {
      if (res["code"] !== 200) {
        this.util.message("请求失败,请联系管理员", false, 3000);
      } else {
        this.slides = res && res["banners"];
      }
    });
    //切换至我的音乐tab
    if (this.router.url.includes("singlist")) {
      this.isShow = false;
    }
    //监听路由获取歌单id及歌曲id请求资源
    this.route.queryParams.subscribe(res => {
      this.currentId = res.songId;
      this.getlyric(res.songId)
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
      //获取歌单id请求歌单列表及播放信息
      let id =
        (this.route.children &&
          this.route.children[0] &&
          this.route.children[0].snapshot &&
          this.route.children[0].snapshot.params.id) || '';
      if(id){
        this.http
        .get("http://47.105.150.105/m-api/playlist/detail?id=" + id)
        .subscribe(result => {
          this.listOfData = result["playlist"]["tracks"];
          this.playView = result["playlist"]["tracks"].find(item => {
            return item.id == res.songId;
          });
        });
      }
        //判断歌手id请求歌手歌单详情
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
    //调整进度条
    this.audio.nativeElement.ontimeupdate = function() {
      let process = document.getElementsByClassName("son")[0]
      // 视频当前时间 / 视频总时长 变成百分比
      let perWidth = (this.currentTime / this.duration) * 100 + "%";
      process.setAttribute("style", `width: ${perWidth}`);
    };
  }
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
  //调整歌曲播放时长
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
  //切换播放状态
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
  //调节音量
  volume(e) {
    let vbg = document.getElementById("vbg");
    let Volume = document.getElementById("curVolume");
    let curVolume = vbg.getBoundingClientRect().bottom - e.clientY;
    Volume.setAttribute("style", `height: ${curVolume}px`);
    this.audio.nativeElement.volume =
      Math.floor((curVolume / vbg.clientHeight) * 100) / 100;
  }
  //搜索歌曲
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
  //播放搜索歌曲
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
    this.getlyric(id)
  }
  //切歌
  next(type) {
    let id
    this.currentId = this.playView && this.playView["id"];
    this.currentIndex = this.listOfData.findIndex((item, index) => {
      return item.id == this.currentId;
    });
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
  getlyric(id){
    if(!id){
      return
    }
    this.http.get('http://47.105.150.105/m-api/lyric?id='+ id).subscribe(res => {
      if(!res){
        this.util.message('加载歌词有误')
      }
      this.lyricList = formatLyric(res['lrc']['lyric'])
      function formatLyricTime(str) {
        var arr=str.split(":");
        var second=0;
        if (arr.length==3) {
          second=-(-arr[0]*3600-arr[1]*60-arr[2]);
        } else {
          second=-(-arr[0]*60-arr[1]);
        }
        return second.toFixed(3);
      }
      function formatLyric(str) {
        var arr=[],
            brr=[],
            crr=[],
            data={};
        // 将字符串按“\n” 分割成数组
        arr=str.split("\n");
        // 去除最后一个空格
        arr.splice(-1,1);
        // 存入crr数组中
        for (var i=0;i<arr.length;i++) {
          // 将字符串按“]” 分割成数组
          brr=arr[i].split("]");
          // 匹配歌词时间，排除歌词附加信息 eg: "by:Treckiefans"
          // /^(\d+:){1,2}\d+\.?\d+$/g  match 00:02 || 00:00:03 || 00:00:05.2
          if (!!/^(\d+:){1,2}\d+\.?\d+$/g.test(brr[0].substring(1))) {
            data={
              "timepoint":formatLyricTime(brr[0].substring(1)),
              "lrcstr":brr[1] || ''
            };
            // 将所有键值对放入数组中
            crr.push(data);
          } else {
            // 歌词贡献者信息，暂不处理 "by:Treckiefans"
          }
        }
        return crr;
      }
    })
  }
  scroll(){
    if(this.lyric){
      this.lyricList.forEach(item => {
        if(item.timepoint < this.audio.nativeElement.currentTime + 2 && this.audio.nativeElement.currentTime < item.timepoint){
          this.lyric.nativeElement.scrollTop += 3.5
        }
      })
    }
  }
}
