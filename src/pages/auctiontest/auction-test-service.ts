import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { AuctionItemModel } from '../auctionitems/auction.model';

import * as io from 'socket.io-client';





@Injectable()
export class AuctionTestService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  auctionitems: Observer<AuctionItemModel[]> ; //= null; //  list of objects
  auctionitem: Observer<AuctionItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/consumerside'); 
	  this.recordname = "mandicollection"; 


  }
  
   getProducerList(producerdata:any): Observable<AuctionItemModel[]> {

   this.socket.on('consumerAuctions', (res) => {
      this.auctionitems.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'producerlistall'
	};
	var listalldata = {
		query: query,
		recordname: this.recordname,
		useraddress: producerdata.address
	};
	    
    this.socket.emit('getconsumerAuctions', listalldata);


    return this.createObservable();
  }

  createObservable() : Observable<AuctionItemModel[]> {
      return Observable.create((observer: Observer<AuctionItemModel[]>) => {
        this.auctionitems = observer;
      });
  }
  
  getObservable() : Observable<AuctionItemModel> {
      return Observable.create((observer: Observer<AuctionItemModel>) => {
        this.auctionitem = observer;
      });
  }
  RefreshPriceOfAuction(auctionitem: any): any {
	  var pushdata = {
		data: auctionitem,
		recordname: this.recordname
	};
	    
   this.socket.on('issuedAsset', (res) => {
      this.auctionitem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

  
  // Create a bramd new insurelist
  bidPriceforAuction(auctionitem: any): any {
	  var pushdata = {
		data: auctionitem,
		recordname: this.recordname
	};
	    
   this.socket.on('issuedAsset', (res) => {
      this.auctionitem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

  // Create a bramd new insurelist
  transferToAggregator(auctionitem: any): void {
	  var pushdata = {
		data: auctionitem,
                actiontype: 'producertoaggregator',
		recordname: this.recordname
	};
	    
    this.socket.emit('sendAssetFrom', pushdata);
  }
  

  createErrorObservable() : Observable<any> {
      return Observable.create((observer: Observer<any>) => {
        this.observer = observer;
      });
  }  
  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }

}
