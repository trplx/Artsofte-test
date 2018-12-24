import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

	transactions = [];

  constructor() { }

  ngOnInit() {
  	if (localStorage.length > 0) {
      Object.keys(localStorage).forEach(item => {
        this.transactions.push(JSON.parse(localStorage.getItem(item)));
      });
    }
  }

  delete($event) {
    $event.preventDefault();
    const id = $event.target.dataset.id;
    this.transactions = this.transactions.filter(transactions => transactions.id !== Number(id));
    localStorage.removeItem(id);
  }

}
