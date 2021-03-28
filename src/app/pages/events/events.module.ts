import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { SelectedEventComponent } from './event-list/selected-event/selected-event.component';
const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'create', component: EventCreateComponent },
]


@NgModule({
  declarations: [EventListComponent, EventCreateComponent, SelectedEventComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedComponentsModule,
    HttpClientModule
  ],
  providers:[DatePipe]
})
export class EventsModule { }
