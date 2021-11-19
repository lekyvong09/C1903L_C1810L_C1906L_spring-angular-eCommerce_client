import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Country} from '../_model/country';
import {State} from '../_model/state';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCreditCardYears(): Observable<number[]> {
    const data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(`${this.baseUrl}countries`).pipe(
        map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    return this.httpClient.get<GetResponseStates>(`${this.baseUrl}states/search/findByCountryCode?code=${theCountryCode}`).pipe(
        map(response => response._embedded.states)
    );
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
