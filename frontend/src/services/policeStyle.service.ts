import {BehaviorSubject, Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {CLASSIC_Police} from "../mocks/PoliceStyle.mock";
import {PoliceStyle} from "../models/PoliceStyle.model";

@Injectable({
  providedIn: 'root'
})
export class PoliceStyleService {
  private police : PoliceStyle = CLASSIC_Police;

  public police$: BehaviorSubject<PoliceStyle> = new BehaviorSubject(CLASSIC_Police);

  getPoliceStyle(): Observable<PoliceStyle> {
    return this.police$;
  }

  PoliceUpdate(police:PoliceStyle){
    this.police = police;
    this.police$.next(this.police);
  }
}
