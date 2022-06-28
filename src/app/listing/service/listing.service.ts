import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../model/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private ROOT_URL = "http://localhost:8000/api/listings";
  constructor(private http:HttpClient) { }

  getListings():Observable<Listing[]> {
    return this.http.get<Listing[]>(this.ROOT_URL);
  }

  getListing(id:string):Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.ROOT_URL}/${id}`);
  }

  addListing(listing:any) {
    return this.http.post<any>(this.ROOT_URL,listing);
  }

  editListings(listing:any,id:string) {
    return this.http.put<any>(`${this.ROOT_URL}/${id}`,listing);
  }
}
