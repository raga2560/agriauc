	import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuctionPoolItemDetailsPage } from './item-details/item-details';
import { AuctionPoolItemModel } from './auctionpool.model';
import { AuctionPoolService } from './auctionpool.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class AuctionPoolListPage {
  icons: string[];
  items: Array<any>;
  

  // feed: AuctionItemModel = new AuctionItemModel();
  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public auctionpoolservice: AuctionPoolService, public loadingCtrl: LoadingController ) {
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
//    this.loading.present();
    
	this.auctionpoolservice
      .getAuctionPoolItems().subscribe(posts  => {
       // this.items = posts;
	//  console.log (posts);

	 for(var i=0; i< posts.length; i++) {
                  if(posts[i].details != null) {
                 // console.log(JSON.stringify(posts[i].details));
                        this.items.push(posts[i].details) ; //= posts;
                  }
          }

//	  this.loading.dismiss();
    });
	
  }
  

  itemTapped(event, item) {
    this.navCtrl.push(AuctionPoolItemDetailsPage, {
      item: item
    });
  }
}
