import {Component, OnInit} from "@angular/core";
import {LoupeService} from "../../services/loupe.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public loupeService:LoupeService) {
  }

  ngOnInit() {
    this.loupeService.setup();
  }

}
