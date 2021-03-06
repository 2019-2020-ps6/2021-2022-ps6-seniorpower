import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Theme} from "../../../models/theme.model";
import {Quiz} from "../../../models/quiz.model";
import {Observable, of} from "rxjs";
import {Formatting} from "../../../models/formatting.model";
import {FormattingService} from "../../../services/formatting.service";

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
  listQuiz: Quiz|undefined;
  formatting: Formatting|undefined;

  @Output()
  themeSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectTheme() {
    this.themeSelected.emit(true);
  }

}
