import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [ControlErrorComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErrorComponent,
    ModalComponent
  ]
})
export class SharedComponentsModule { }
