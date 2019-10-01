import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userValid = new BehaviorSubject(false);
  currentValid = this.userValid.asObservable();

  constructor() { }

  changeValid(valid: boolean) {
    this.userValid.next(valid);
  }
}
