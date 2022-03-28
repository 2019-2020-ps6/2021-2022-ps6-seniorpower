import {BehaviorSubject, Observable} from 'rxjs';
import {ColorStyle} from "../models/colorstyle.model";
import {Injectable} from "@angular/core";
import {DEFAULT_COLOR} from "../mocks/colorstyle.mock";

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private color: ColorStyle = DEFAULT_COLOR;

  public color$: BehaviorSubject<ColorStyle> = new BehaviorSubject(DEFAULT_COLOR);

  getColorStyle(): Observable<ColorStyle> {
    return this.color$;
  }

  colorUpdate(color:ColorStyle){
    this.color = color;
    this.color$.next(this.color);
}
}
