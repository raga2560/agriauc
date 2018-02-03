import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AuctionTestService } from './auction-test-service';
import { AuctionItemModel } from '../auctionitems/auction.model';
import { AuctionListPage } from '../auctionitems/list';
import { Http } from '@angular/http';




@Component({
  selector: 'page-producer-entry',
  templateUrl: 'auction-test.html'
})
export class AuctionTestPage {
  selectedItem: any;
  auctionitem: AuctionItemModel = new AuctionItemModel();
  producer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryservice: AuctionTestService, public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
	
	/*
	this.http.get('./assets/example_data/users.json').map(res => {
		
		this.producer =res.json().users[1];
		console.log(this.producer);
	
	}); */
	
	this.producer ={
            "name": "Paras",
			"role": "producer",
			"blockaddress": "1YuMTUESchZYPkba44nEknCjeATRFir58qGTmi",
			"preference": ["organic", "native", "raw"],
			"itemtypes": ["rice", "dhal", "fruits"],
			"place": "Bangalore"
        };
		
	
  }
  
  createItemEntry() {
	var dataforblockchain = {
		address: this.producer.blockaddress,
		asset:  {
                name: this.auctionitem.title,
                open: true
            },
		qty: this.auctionitem.quantity,
		units: 0.1,
		details: this.auctionitem
		
	};
      
    this.entryservice.createProductEntry(dataforblockchain).subscribe((data)=> {
   	console.log(JSON.stringify(data)); 
	console.log("created this="+data);
    });
	
	this.goToAuctionList();
	
    
	   
  }
  
  goToAuctionList() {
	//  alert(JSON.stringify(property));
    this.navCtrl.push(AuctionListPage);
  }
  
}
