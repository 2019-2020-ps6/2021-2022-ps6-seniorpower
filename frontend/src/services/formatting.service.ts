import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Formatting} from "../models/formatting.model";
import {CLASSIC_Format} from "../mocks/formatting.mock";

@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  currentSize:string = "Moyen";
  private currentSize$: BehaviorSubject<string> = new BehaviorSubject("Moyen");

  currentIllness:string = "Aucune";
  private currentIllness$: BehaviorSubject<string> = new BehaviorSubject("Aucune");

  private format: Formatting = CLASSIC_Format;
  public format$: BehaviorSubject<Formatting> = new BehaviorSubject(CLASSIC_Format);

  getFormatting(): Observable<Formatting> {
    return this.format$;
  }

  formattingUpdate(format:Formatting){
    this.format = format;
    this.format$.next(this.format);
  }

  getCurrentSize(): Observable<string> {
    return this.currentSize$;
  }

  changeSize(size:string){
    this.currentSize = size;
    this.currentSize$.next(this.currentSize);
  }

  getCurrentIllness(): Observable<string>{
    return this.currentIllness$;
  }

  changeIllness(illness:string){
    this.currentIllness = illness;
    this.currentIllness$.next(this.currentIllness);
  }
}
