import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-cards',
  templateUrl: './bank-cards.component.html',
  styleUrls: ['./bank-cards.component.sass']
})
export class BankCardsComponent implements OnInit {

	public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	public years = [18, 19, 20, 21, 22]; // max expiration period 5 years

  public numValidators = [
    Validators.required,
    Validators.maxLength(4),
    Validators.pattern('^\\d{4}$')
  ];

  public selectValues = {};

  cardnumberSen: FormGroup;
  cardnumberRec: FormGroup;
  cardholder: FormControl;
  expirationDate: FormGroup;
  sum: FormControl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  	this.cardholder = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z\\s]+$')
      ]);

    this.cardnumberSen = new FormGroup({
      numSet1: new FormControl('', this.numValidators),
      numSet2: new FormControl('', this.numValidators),
      numSet3: new FormControl('', this.numValidators),
      numSet4: new FormControl('', this.numValidators)
    });

    this.expirationDate = new FormGroup({
      month: new FormControl(),
      year: new FormControl()
    });

    this.sum = new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$')
    ]);

    this.cardnumberRec = new FormGroup({
      numSet1: new FormControl('', this.numValidators),
      numSet2: new FormControl('', this.numValidators),
      numSet3: new FormControl('', this.numValidators),
      numSet4: new FormControl('', this.numValidators)
    });

    this.reloadForm();
  }

  transfer() {
    const currentDate = new Date();
    const transaction = {
      id: new Date().getTime(), // unique id
      cardnumberSen: this.cardnumberSen.value,
      cardnumberSenMask: Object.values(this.cardnumberSen.value).join(' ').replace(/(\s\d+){2}/, ' **** ****'),
      name: this.cardholder.value,
      expirationDate: this.expirationDate.value,
      transactionDate: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
      cardnumberRec: this.cardnumberRec.value,
      cardnumberRecMask: Object.values(this.cardnumberRec.value).join(' ').replace(/(\s\d+){2}/, ' **** ****'),
      sum: this.sum.value
    };
    
    localStorage.setItem(String(transaction.id), JSON.stringify(transaction));
  }

  reloadForm() {
    const transactionId = this.route.snapshot.params.id;
    const transactionDt = JSON.parse(localStorage.getItem(transactionId));

    if (!transactionId || !transactionDt) {
      return null;
    }

    this.selectValues = {
      month: Number(transactionDt.expirationDate.month),
      year: transactionDt.expirationDate.year
    };

    this.sum.patchValue(transactionDt.sum, { emitEvent: false });
    this.cardholder.patchValue(transactionDt.name, { emitEvent: false });
    this.cardnumberSen.setValue(transactionDt.cardnumberSen, { emitEvent: false });
    this.cardnumberRec.setValue(transactionDt.cardnumberRec, { emitEvent: false });
    this.expirationDate.setValue(transactionDt.expirationDate, { emitEvent: false });
  }
}
