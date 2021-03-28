import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  control: AbstractControl;

  error$: Observable<string>;

  private get constrolError(): string {
    for (const key in this.control?.errors) {
      if (Object.prototype.hasOwnProperty.call(this.control.errors, key)) {
        return this.control.errors[key]?.message;
      }
    }
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.error$ = combineLatest([this.control.statusChanges, this.control.valueChanges])
      .pipe(map(([status, value]: [string, any]) => {
        return status === 'INVALID' ? this.constrolError : '';
      }))
  }

}
