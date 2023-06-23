import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../alert.service";
import { ApiService, Game } from '../api.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {
    authService.redirectIfNotAuthenticated();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      platform: new FormControl('', Validators.required),
      releasedYear: new FormControl(new Date().getFullYear(), Validators.required),
      pictureUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      motionPictureRate: new FormControl('', Validators.required),
    });
  }

  onsubmit() {
    if (true || this.form.valid) {
      this.alertService.clear();
      const game = {
        name: this.form.get('name')?.value,
        platform: this.form.get('platform')?.value,
        pictureURL: this.form.get('pictureUrl')?.value,
        rate: this.form.get('motionPictureRate')?.value,
      } as Game;

      this.apiService.addGame(game).subscribe({
        next: (values) => {
          this.alertService.showSuccess("Successfully created!")
        },
        error: (error) => {
          this.alertService.showAPIError(error)
        }
      })

    } else {
      this.alertService.showFormValidationErrors(this.form)
    }
  }


  resetForm() {
    this.form.reset();
  }

}
