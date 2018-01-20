import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AggregatorItemDetailsPage } from './item-details/item-details';
import { AggregatorItemModel } from './aggregator.model';
import { AggregatorService } from './aggregator.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class AggregatorListPage {
  icons: string[];
  items: Array<any>;
  

  // feed: AuctionItemModel = new AuctionItemModel();
  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public tradeservice: AggregatorService, public loadingCtrl: LoadingController ) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

	this.loading = this.loadingCtrl.create();
    this.items = [];
	/*
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    } */
  }
  
    ionViewDidLoad() {
    this.loading.present();
    
	this.tradeservice
      .getItemToCertify().subscribe(posts  => {
      this.items = posts;
	  this.loading.dismiss();
    });
	
  }
  

  itemTapped(event, item) {
    this.navCtrl.push(AggregatorItemDetailsPage, {
      item: item
    });
  }
}
