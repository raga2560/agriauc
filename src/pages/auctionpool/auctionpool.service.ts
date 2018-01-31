import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { AuctionPoolItemModel } from './auctionpool.model';

import * as io from 'socket.io-client';





@Injectable()
export class AuctionPoolService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  auctionpools: Observer<AuctionPoolItemModel[]> ; //= null; //  list of objects
  auctionpool: Observer<AuctionPoolItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/blockchain'); 
	  this.recordname = "mandicollection"; 


  }
  
   getAuctionPoolItems(): Observable<AuctionPoolItemModel[]> {

   this.socket.on('allAssetsDB', (res) => {
      this.auctionpools.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'producerlistall'
	};
	var listalldata = {
		query: query,
		recordname: this.recordname
	};
	    
    this.socket.emit('getAllAssetsDB', listalldata);


    return this.createObservable();
  }

  createObservable() : Observable<AuctionPoolItemModel[]> {
      return Observable.create((observer: Observer<AuctionPoolItemModel[]>) => {
        this.auctionpools = observer;
      });
  }
  
  getObservable() : Observable<AuctionPoolItemModel> {
      return Observable.create((observer: Observer<AuctionPoolItemModel>) => {
        this.auctionpool = observer;
      });
  }
  
  // Create a bramd new insurelist
  createProductEntry(auctionpool: any): any {
	  var pushdata = {
		data: auctionpool,
		recordname: this.recordname
	};
	    
   this.socket.on('issuedAsset', (res) => {
      this.auctionpool.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

  // Create a bramd new insurelist
  transferToAuctionPool(auctionpool: any): void {
	  var pushdata = {
		data: auctionpool,
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
