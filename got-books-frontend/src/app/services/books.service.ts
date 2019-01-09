import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url="https://anapioficeandfire.com/api/books"
  constructor(
  private _http:HttpClient
  ) { }

  getAllBooks(pageNumber,pageSize){
    console.log(pageNumber);
    
    return this._http.get(`${this.url}?page=${pageNumber}&pageSize=${pageSize},`);
  }
  getBookDetail(bookId){
    return this._http.get(`${this.url}/${bookId}`)
  }
}
