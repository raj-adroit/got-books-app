import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  bookId: String = '';
  bookReviews=[];
  book={
    bookId:null,
    message:""
  }
  bookDetails:any;
  
  constructor(
    private _route: ActivatedRoute,
    private _bookService:BooksService,
    private _reviewService:ReviewService
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.bookId = params['id'];
      this.getBookDetail();
      this.getAllReviews();
    });
    
  }

  getBookDetail(){
    this._bookService.getBookDetail(this.bookId).subscribe((data:any)=>{
        this.bookDetails=data;
        // console.log(data);
    },
    (err)=>{
      console.log("Unable to fetch book detail");
    })
  }

  createReview(){
    this.book.bookId=this.bookId;
    // console.log(this.book);
    // console.log(this.book.message.length)
    if(this.book.message.length == 0) {
      return alert("Please enter review message");
    }
    this._reviewService.createReview(this.book).subscribe((data:any)=>{
     if(data!=null){
       this.getAllReviews();
     
     }
     this.book.message="";
    },
    (err:any)=>{
      console.log("Backend service not running");
    })
  }

  getAllReviews(){
    this._reviewService.getAllReviews(this.bookId).subscribe((data:any)=>{
      this.bookReviews=data;
      this.bookReviews.reverse();
    },
    (err:any)=>{
      console.log("Unable to fetch book details now");
    })
  }

}
