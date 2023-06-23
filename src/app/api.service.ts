import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getFeaturedGames() {
    return this.http.get(environment.apiUrl)
  }

  getAllGames(skip: number, limit: number, searchText: string) {
    return this.http.get<GameResponse>(`${environment.apiUrl}/games?skip=${skip}&limit=${limit}&searchText=${searchText}`)
  }

  getGameDetail(gameId: string) {
    return this.http.get<Game>(environment.apiUrl + "/games/" + gameId);
  }
  addGame(game: Game) {
    return this.http.post<Game[]>(environment.apiUrl + "/games", game)
  }
  deleteGame(gameId: string | null) {
    return this.http.delete<Game[]>(environment.apiUrl + "/games/" + gameId)
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(environment.apiUrl + '/auth/login', { username, password });
  }
}

export class LoginResponse {
  token!: string;
}

export class Game {
  _id!: string;
  name!: string;
  rate!: string;
  pictureURL!: string;
  platform!:string;
  description!: string;
}

export class GameResponse {
  games!: Game[];
  totalGameCount!: number;
  skip!: number;
  limit!: number;
}
