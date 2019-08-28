import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodosModule} from './todos/todos.module';
import { CountdownModule} from './countdown/countdown.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RouterModule , Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent} from './todos/todo/todo.component';
import { SongListComponent } from './song-list/song-list.component';
import { UtilsService } from './utils.service';
import { RanklistComponent } from './ranklist/ranklist.component';
import { SingerComponent } from './singer/singer.component';
import { SonglistComponent } from './songlist/songlist.component';
import { ArtistComponent } from './artist/artist.component';
import { SingComponent } from './singer/sing/sing.component';
import { TimeformatPipe } from './timeformat.pipe'
 

//配置路由规则
const appRoutes : Routes = [
  {
    path:'home',
    component:HomeComponent,
    children: [
      {path: 'songList', component:SongListComponent},
      {path: 'todos', component:TodoComponent},
      {path: 'rank', component:RanklistComponent},
      {path: 'singer', component:SingerComponent},
      {path: 'singlist',component:SonglistComponent},
      {path: 'singlist/:id',component:SonglistComponent},
      {path: 'artist',component:ArtistComponent}
  ]
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SongListComponent,
    RanklistComponent,
    SingerComponent,
    SonglistComponent,
    ArtistComponent,
    SingComponent,
    TimeformatPipe,
  ],
  imports: [
    BrowserModule,
    TodosModule,
    CountdownModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers:[UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
