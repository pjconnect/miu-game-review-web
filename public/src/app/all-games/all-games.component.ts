import { Component, OnInit } from '@angular/core';
import { ApiService, Game } from '../api.service';
import { AlertService } from '../alert.service';
// import { Timeout } from 'node';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  games: Game[] = [];
  totalPageCount!: number;
  currentPage!: number;
  limit: number = 8;
  skip: number = 0;
  searchText: string = "";

  private searchTimeBufferSeconds = 1;
  private searchTimerInstance!: any;

  get pages() {
    let pageCount = this.totalPageCount;
    if (!pageCount) {
      pageCount = 1;
    }
    console.log(pageCount);

    return new Array(pageCount)
  }

  constructor(private api: ApiService, private alert: AlertService) {

  }

  ngOnInit() {
    this.getGames(this.skip, this.limit, this.searchText);
  }

  getGames(skip: number, limit: number, searchText: string) {
    this.api.getAllGames(skip, limit, searchText).subscribe({
      next: (gamesResponse) => {
        this.games = gamesResponse.games;
        this.limit = gamesResponse.limit;
        this.skip = gamesResponse.skip;
        this.totalPageCount = Math.ceil(gamesResponse.totalGameCount / gamesResponse.limit);
        this.currentPage = Math.floor(gamesResponse.skip / gamesResponse.limit);
      }, error: (error) => {
        this.alert.showAPIError(error)
      }
    })
  }

  getPageResult(pageNumber: number) {
    const skip = pageNumber * this.limit;
    this.getGames(skip, this.limit, this.searchText);
  }

  search() {
    clearTimeout(this.searchTimerInstance);
    this.searchTimerInstance = setTimeout(() => {
      const noSkip = 0;
      this.getGames(noSkip, this.limit, this.searchText);
    }, this.searchTimeBufferSeconds * 1000)
  }

}
