import { Component, OnInit } from '@angular/core';
import {ColorStyle} from "../../models/colorstyle.model";
import {DEFAULT_COLOR} from "../../mocks/colorstyle.mock";
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorStyle:ColorStyle = DEFAULT_COLOR;
  constructor(public colorService: ColorService) {
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
  }

  ngOnInit() {
  }
}
