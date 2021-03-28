import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, timeout } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class EventCreateRepository {

    constructor(private httpClient: HttpClient) {

    }

    save(data: FormData): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/sendEvent`, data);
    }
}