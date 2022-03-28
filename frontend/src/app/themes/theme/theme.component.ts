import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  theme: Theme | undefined;

  @Output()
  themeSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectTheme() {
    this.themeSelected.emit(true);
  }
}
