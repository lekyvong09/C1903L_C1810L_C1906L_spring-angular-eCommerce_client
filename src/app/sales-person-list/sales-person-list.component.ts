import { Component, OnInit } from '@angular/core';
import {SalesPerson} from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList: SalesPerson[];

  constructor() { }

  ngOnInit(): void {
    this.salesPersonList = [
      new SalesPerson('Ray', 'Le', 'ray@mail.com', 10000),
      new SalesPerson('Tommy', 'Le', 'ray@mail.com', 15000),
      new SalesPerson('David', 'Nguyen', 'David@mail.com', 20000),
      new SalesPerson('Mike', 'Nguyen', 'Mike@mail.com', 30000)
    ];
  }

}
