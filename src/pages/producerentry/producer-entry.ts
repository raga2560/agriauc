import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-producer-entry',
  templateUrl: 'producer-entry.html'
})
export class ProducerEntryPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
