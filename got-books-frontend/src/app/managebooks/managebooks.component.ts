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
  page = 1;
  pageSize=12;
  columnDefs = [
      {headerName: 'Book No', field: 'index'},
      {headerName: 'Book', field: 'name'},
      {headerName: 'No. of pages', field: 'numberOfPages'},
      {headerName: 'No. of characters', field: 'numberOfCharacters'}
  ];

  rowData = [];
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
      processedData.push({
        index: +index + 1,
        bookId: +data[index].url.split('/').pop(),
        name: data[index].name,
        numberOfPages: data[index].numberOfPages,
        numberOfCharacters: data[index].characters.length,
      })
    }
    return processedData;
  }

  getAllBookList() {
    this._bookService.getAllBooks(this.page,this.pageSize).subscribe((data: any) => {
      this.rowData = this.processData(data);
    },
      (err: any) => {
        console.log('problem in getting books list');
      })
  }
  
  goToBookDetail(event) {
    this._router.navigate(['/bookdetail'], { queryParams: { id: event.data.bookId } })
  }
 
 
}
