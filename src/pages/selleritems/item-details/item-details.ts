import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ProduceEntryService } from '../../producerentry/producer-entry-service';
import { SellerListPage } from '../list';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class SellerItemDetailsPage {
  selectedItem: any;
  
  producer: any;
  aggregator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryservice: ProduceEntryService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
	
	this.producer ={
            "name": "Paras",
			"role": "producer",
			"blockaddress": "1YuMTUESchZYPkba44nEknCjeATRFir58qGTmi",
			"preference": ["organic", "native", "raw"],
			"itemtypes": ["rice", "dhal", "fruits"],
			"place": "Bangalore"
        };
		
	this.aggregator = {
           "name": "Kiran",
			"role": "aggregator",
			"blockaddress": "1RHaNKBK3CQmpPpvuSexGMZNeh4FBbSAVJJzVP",
			"preference": ["organic", "native", "raw"],
			"itemtypes": ["rice", "dhal", "fruits"],
			"place": "Bangalore"
        };
		
		
  }
  
  
  
   transferToAggregator() {
	var dataforblockchain = {
		toaddress: this.aggregator.blockaddress,
		fromaddress: this.producer.blockaddress,
		asset:  {
                name: this.selectedItem.title,
                open: true
            },
		qty: 1,
		units: 0.1,
		details:this.selectedItem 
		
		
	};
      
    this.entryservice.transferToAggregator(dataforblockchain);
	
    this.goToSellerList();	
	
    
	   
  }
  
  goToSellerList() {
	//  alert(JSON.stringify(property));
    this.navCtrl.setRoot(SellerListPage);
  }
  
  

}
