import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ProduceEntryService } from './producer-entry-service';
import { SellerItemModel } from '../selleritems/seller.model';
import { SellerListPage } from '../selleritems/list';
import { Http } from '@angular/http';




@Component({
  selector: 'page-producer-entry',
  templateUrl: 'producer-entry.html'
})
export class ProducerEntryPage {
  selectedItem: any;
  selleritem: SellerItemModel = new SellerItemModel();
  producer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryservice: ProduceEntryService, public http: Http) {
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
                name: this.selleritem.title,
                open: true
            },
		qty: this.selleritem.quantity,
		units: 0.1,
		details: this.selleritem
		
	};
      
    this.entryservice.createProductEntry(dataforblockchain);
	
	this.goToSellerList();
	
    
	   
  }
  
  goToSellerList() {
	//  alert(JSON.stringify(property));
    this.navCtrl.push(SellerListPage);
  }
  
}
