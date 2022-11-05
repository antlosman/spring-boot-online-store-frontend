import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {State} from "../common/state";

// unwraps the json from Spring Data REST _embedded entry
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class Luv2shopFormService {

  private countriesUrl = 'http://localhost:8080/countries';
  private stateUrl = 'http://localhost:8080/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // array for Month dropdown list - start at current month

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data); // "of" operator wraps an object as an Observable
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // array for Year dropdown list - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data); // of operator wraps an object as an Observable

  }
}
