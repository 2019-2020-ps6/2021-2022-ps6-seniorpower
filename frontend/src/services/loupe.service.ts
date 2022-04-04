import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoupeService {

  loupeOn:boolean

  constructor() {
  }

  refresh(){
    if (this.loupeOn) {
      this.loupeOn = false;
      document.getElementById( 'magnify_glass').remove()
    }
    else{
      const loupeElem = document.createElement('div');
      loupeElem.setAttribute('id', 'magnify_glass');
      loupeElem.setAttribute('class', 'magnify_glass');
      const element = document.getElementById("element_to_magnify")
      document.getElementById("main").insertBefore(loupeElem,element)

      document.getElementById("hidden-loupe-button").click();
      this.loupeOn =true;
    }
  }
  setup(){
    if (!this.loupeOn)
      return
    this.loupeOn = false;
    document.getElementById( 'magnify_glass').remove();
  }

}
