import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { SellerItemModel } from '../selleritems/seller.model';

import * as io from 'socket.io-client';





@Injectable()
export class ProduceEntryService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  selleritems: Observer<SellerItemModel[]> ; //= null; //  list of objects
  selleritem: Observer<SellerItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/blockchain'); 
	  this.recordname = "mandicollection"; 


  }
  
   getProducerList(): Observable<SellerItemModel[]> {

   this.socket.on('allAssetsDB', (res) => {
      this.selleritems.next(res);
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

  createObservable() : Observable<SellerItemModel[]> {
      return Observable.create((observer: Observer<SellerItemModel[]>) => {
        this.selleritems = observer;
      });
  }
  
  getObservable() : Observable<SellerItemModel> {
      return Observable.create((observer: Observer<SellerItemModel>) => {
        this.selleritem = observer;
      });
  }
  
  // Create a bramd new insurelist
  createProductEntry(selleritem: any): void {
	  var pushdata = {
		data: selleritem,
		recordname: this.recordname
	};
	    
    this.socket.emit('issueAsset', pushdata);
  }

  // Create a bramd new insurelist
  transferToAggregator(selleritem: any): void {
	  var pushdata = {
		data: selleritem,
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