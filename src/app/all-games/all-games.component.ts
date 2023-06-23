import { Component, OnInit } from '@angular/core';
import { ApiService, Game } from '../api.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit{

  games:Game[] = [];
  totalPageCount!: number;
  currentPage!: number;
  limit:number = 6;
  skip:number = 0;

  get pages(){
    return new Array(this.totalPageCount)
  }

  constructor(private api: ApiService, private alert: AlertService) {

  }

  ngOnInit() {
    this.getGames(this.skip, this.limit);
  }

  getGames(skip:number, limit:number){
    this.api.getAllGames(skip, limit).subscribe({next:(gamesResponse) => {
      console.log('games', gamesResponse);
      
      this.games = gamesResponse.games;
      this.limit  = gamesResponse.limit;
      this.skip = gamesResponse.skip;
      this.totalPageCount = Math.ceil(gamesResponse.totalGameCount / gamesResponse.limit);
      this.currentPage = Math.floor(gamesResponse.skip / gamesResponse.limit);

    }, error: (error) => {
      this.alert.showAPIError(error)
    }})
  }


  getPageResult(pageNumber:number){
    const skip = pageNumber * this.limit;
    this.getGames(skip, this.limit);
  }

}
