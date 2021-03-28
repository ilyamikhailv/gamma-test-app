import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedEventComponent implements OnInit {

  constructor() { }

  @Input('event')
  event: EventModel;

  ngOnInit(): void {
  }

}
