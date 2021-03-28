import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, EMPTY, fromEvent, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { nameof } from 'src/app/core/nameof';
import { EventCreateModel } from './event-create.model';
import { EventCreateService } from './event-create.service';

@Component({
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreateComponent implements OnInit, AfterViewInit {

  constructor(private builder: RxFormBuilder, private eventCreateService: EventCreateService, private datePipe: DatePipe) { }
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private alertSettings: BehaviorSubject<{ type: 'success' | 'danger', text: string }> = new BehaviorSubject<{ type: 'success' | 'danger', text: string }>(null);
  alert$ = this.alertSettings.asObservable().pipe(
    tap(settings => {
      if (settings) {
        setTimeout(() => this.alertSettings.next(null), 10000);
      }
    })
  );
  loading$ = this.loadingSubject.asObservable();
  createEventFormGroup: FormGroup;
  eventOptions: { value: any, text: string }[] = [];

  @ViewChild('saveBtn', { static: false }) sendBtn: ElementRef<HTMLButtonElement>;

  getControl(name: keyof EventCreateModel): AbstractControl {
    return this.createEventFormGroup.get(name);
  }
  reset() {
    this.createEventFormGroup.reset();
  }

  private showFormErrors() {
    for (const key in this.createEventFormGroup.controls) {
      const control = this.createEventFormGroup.get(key);
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.createEventFormGroup = this.builder.formGroup(EventCreateModel);
    this.eventOptions = [
      { value: 1, text: 'Значение 1' },
      { value: 2, text: 'Значение 2' },
      { value: 3, text: 'Значение 3' },
      { value: 4, text: 'Значение 4' },
      { value: 5, text: 'Значение 5' },
      { value: 6, text: 'Значение 6' },
      { value: 7, text: 'Значение 7' },
      { value: 8, text: 'Значение 8' },
      { value: 9, text: 'Значение 9' },
      { value: 10, text: 'Значение 10' },
    ];
  }

  ngAfterViewInit(): void {
    fromEvent(this.sendBtn.nativeElement, 'click').pipe(
      withLatestFrom(of(this.createEventFormGroup)),
      map(([, group]: [any, RxFormGroup]) => {
        if (group.invalid) {
          this.showFormErrors();
        }
        return group;
      }),
      filter(group => group.valid),
      tap(() => this.loadingSubject.next(true)),
      debounceTime(3000),
      switchMap(group => {
        group.get(nameof<EventCreateModel>('date')).setValue(this.datePipe.transform(new Date(), 'dd.mm.yyyy'));
        group.get(nameof<EventCreateModel>('time')).setValue(this.datePipe.transform(new Date(), 'HH:mm'));
        return this.eventCreateService.save((group as RxFormGroup).toFormData()).pipe(
          catchError(reason => {
            this.loadingSubject.next(false)
            this.alertSettings.next({ type: 'danger', text: 'Ошибка сохранения' });
            return EMPTY;
          })
        )
      }),
      tap(() => this.loadingSubject.next(false)),
      tap(() => this.alertSettings.next({ type: 'success', text: 'Сохранено успешно' })),
    ).subscribe()
  }

}
