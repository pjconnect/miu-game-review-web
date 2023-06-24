import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Game } from '../api.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {

  constructor(public auth: AuthService, private router: Router, private api: ApiService, private activeRoute: ActivatedRoute, private alert: AlertService) {

  }
  game!: Game;

  gameId!: string | null;

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.gameId = params.get('gameId');
      this.getGame();
    });
  }

  getGame() {
    if(!this.gameId){
      return;
    }
    this.api.getGameDetail(this.gameId).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (error) => {
        this.alert.showAPIError(error);
      }
    })
  }

  onDelete() {
    this.api.deleteGame(this.gameId).subscribe({
      next: () => {
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        this.alert.showAPIError(error);
      }
    })
  }

}
