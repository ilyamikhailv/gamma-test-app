import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { EventModel } from '../models/event.model';
import { events } from './event-list.data';

@Component({
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit {

  constructor() { }

  private eventsSubject: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);
  private selectedEventSubject: BehaviorSubject<EventModel> = new BehaviorSubject<EventModel>(null);
  private eventList$ = this.eventsSubject.asObservable();
  private searchStrSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private searchStr$ = this.searchStrSubject.asObservable().pipe(
    debounceTime(350)
  )
  selectedEvent$ = this.selectedEventSubject.asObservable();
  items$ = combineLatest([this.eventList$, this.searchStr$]).pipe(
    map(([items, str]) => {
      if (str?.length >= 3)
        return items.filter(i => i.theme.includes(str) || !str);
      return items;
    })
  )
  @ViewChild(ModalComponent) modal: ModalComponent;

  searchChange(value) {
    this.searchStrSubject.next(value);
  }

  showDetails(item: EventModel) {
    this.selectedEventSubject.next(item);
    this.modal.open();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.eventsSubject.next(events);
  }

}
