import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, timeout } from "rxjs/operators";
import { EventCreateRepository } from "./event-create.repository";

@Injectable({ providedIn: 'root' })
export class EventCreateService {

    constructor(private eventCreateRepository: EventCreateRepository) {

    }

    save(data: FormData): Observable<any> {
        return this.eventCreateRepository.save(data);
    }
}