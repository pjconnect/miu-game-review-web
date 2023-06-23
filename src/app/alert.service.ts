import { Injectable, Input, Output } from '@angular/core';
import {FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
 
  successMessage: string = "";
  errorMessage: string = "";

  constructor() { }
  showSuccess(message: string) {
    this.successMessage = message;
  }
  showAPIError = (error: ErrorResponse) => {
    if (error.error.message) {
      this.errorMessage = error.error.message;
    }
    else if (error.message) {
      this.errorMessage = error.message;
    }
    else {
      this.errorMessage = JSON.stringify(error);
    }
  }
  clear() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  showFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((controlName) => {
      this.errorMessage +=  "[" + controlName + ":" + JSON.stringify(form.get(controlName)?.errors) + "]";
    });

  }
}

class ErrorResponse{
  message!: string;
  error!: {
    message: string;
  }
}
