import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Formatting} from "../models/formatting.model";
import {CLASSIC_Format} from "../mocks/formatting.mock";

@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  private format: Formatting = CLASSIC_Format;

  public format$: BehaviorSubject<Formatting> = new BehaviorSubject(CLASSIC_Format);

  getFormatting(): Observable<Formatting> {
    return this.format$;
  }

  formattingUpdate(format:Formatting){
    this.format = format;
    this.format$.next(this.format);
  }
}
