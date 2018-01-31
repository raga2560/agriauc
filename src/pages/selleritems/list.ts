import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { SellerItemDetailsPage } from './item-details/item-details';
import { SellerItemModel } from './seller.model';
import { SellerService } from './seller.service';
import { ProduceEntryService } from '../producerentry/producer-entry-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class SellerListPage {
  icons: string[];
  items: Array<any>;
  

  // feed: AuctionItemModel = new AuctionItemModel();
  loading: any;
  producer:any ={
            "name": "Paras",
                        "role": "producer",
                        "blockaddress": "1YuMTUESchZYPkba44nEknCjeATRFir58qGTmi",
                        "preference": ["organic", "native", "raw"],
                        "itemtypes": ["rice", "dhal", "fruits"],
                        "place": "Bangalore"
        };

  constructor(public navCtrl: NavController, public navParams: NavParams, public sellerservice: SellerService, public loadingCtrl: LoadingController, public entryservice: ProduceEntryService  ) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

	this.loading = this.loadingCtrl.create();
    this.items = [];
	
  }
  
    ionViewDidLoad() {
   // this.loading.present();
    
	/*
	// This works with stored json data
	
	this.sellerservice
      .getSellerItem().subscribe(posts  => {
      this.items = posts;
	  this.loading.dismiss();
    });
	*/
	
	var producerdata = {
		address: this.producer.blockaddress
	};
	this.entryservice.getProducerList(producerdata).subscribe((posts: any) => {
	  console.log(posts);
	  
	  for(var i=0; i< posts.length; i++) {
		  if(posts[i].details != null) {
			this.items.push(posts[i].details) ; //= posts;  
		  }
	  }
	 // this.loading.dismiss();
      
    });
	
  }
  
   itemTapped(event, item) {
    this.navCtrl.push(SellerItemDetailsPage, {
      item: item
    });
  }
  

 
}
