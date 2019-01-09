import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url='http://localhost:8080/reviews'
  constructor(
    private _http:HttpClient
  ) { }

  public getHttpOptions() {
    const httpOptions = {};
    return httpOptions;
  }


  createReview(data){
    return this._http.post(this.url,data);
  }

  getAllReviews(id){
    return this._http.get(`${this.url}/${id}`)
  }
}
