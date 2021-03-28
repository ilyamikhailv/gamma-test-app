import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  constructor() { }
  private visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();

  @Input()
  title: string;
  @Output('open')
  openHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output('close')
  closeHandler: EventEmitter<any> = new EventEmitter<any>();

  open() {
    this.visibleSubject.next(true);
    this.openHandler.emit();
  }

  close() {
    this.visibleSubject.next(false);
    this.closeHandler.emit();
  }

  ngOnInit(): void {
  }

}
