import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { TradeItemModel } from './trade.model';

import * as io from 'socket.io-client';





@Injectable()
export class TradeService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  tradeitems: Observer<TradeItemModel[]> ; //= null; //  list of objects
  tradeitem: Observer<TradeItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/blockchain'); 
	  this.recordname = "mandicollection"; 


  }
  
   getTradeItems(): Observable<TradeItemModel[]> {

   this.socket.on('allAssetsDB', (res) => {
      this.tradeitems.next(res);
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

  createObservable() : Observable<TradeItemModel[]> {
      return Observable.create((observer: Observer<TradeItemModel[]>) => {
        this.tradeitems = observer;
      });
  }
  
  getObservable() : Observable<TradeItemModel> {
      return Observable.create((observer: Observer<TradeItemModel>) => {
        this.tradeitem = observer;
      });
  }
  
  // Create a bramd new insurelist
  createProductEntry(tradeitem: any): any {
	  var pushdata = {
		data: tradeitem,
		recordname: this.recordname
	};
	    
   this.socket.on('issuedAsset', (res) => {
      this.tradeitem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

  // Create a bramd new insurelist
  transferToAggregator(tradeitem: any): void {
	  var pushdata = {
		data: tradeitem,
                actiontype: 'producertotrade',
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
