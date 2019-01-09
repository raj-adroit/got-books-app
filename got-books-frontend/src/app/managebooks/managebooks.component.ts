import { Component, OnInit } from '@angular/core';  
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

export interface response {

}

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.css']
})
export class ManagebooksComponent implements OnInit {
  bookList = [];
  page = 1;
  pageSize=12;
  mgrid: any;
   columnDefs = [
        {headerName: 'Book No', field: 'index'},
        {headerName: 'Book', field: 'name'},
        {headerName: 'No. of pages', field: 'numberOfPages'},
        {headerName: 'No. of characters', field: 'numberOfCharacters'}
    ];

    rowData = [];
    // [
    //     {make: 'Toyota', model: 'Celica', price: 35000},
    //     {make: 'Ford', model: 'Mondeo', price: 32000},
    //     {make: 'Porsche', model: 'Boxter', price: 72000}
    // ];
  constructor(
    private _bookService: BooksService,
    private _router: Router,
    config: NgbPaginationConfig
  ) { 
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this.getAllBookList();


  }

  processData(data) {
    let processedData = [];
    for(let index in data) {
      let bookId = +data[index].url.split('/').pop()
      processedData.push({
        index: +index + 1,
        bookId: bookId,
        name: data[index].name,
        numberOfPages: data[index].numberOfPages,
        numberOfCharacters: data[index].characters.length,
      })
    }
    return processedData;
  }

  getAllBookList() {
    this._bookService.getAllBooks(this.page,this.pageSize).subscribe((data: any) => {
      this.bookList = data;
      this.rowData = this.processData(data);
    },
      (err: any) => {
        console.log('problem in getting books list');
      })
  }

  
  goToBookDetail(event) {
    this._router.navigate(['/bookdetail'], { queryParams: { id: event.data.bookId } })
  }

  getBookNumber(bookInfo) {
    let bookDetails = bookInfo.split('/');
    return bookDetails[bookDetails.length - 1];
  }

  sortData(column) {
    this.bookList.reverse();
  }

  
 
}
