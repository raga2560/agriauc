
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { AggregatorItemModel } from './aggregator.model';

import * as io from 'socket.io-client';





@Injectable()
export class AggregatorService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  aggregatoritems: Observer<AggregatorItemModel[]> ; //= null; //  list of objects
  aggregatoritem: Observer<AggregatorItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/blockchain'); 
	  this.recordname = "mandicollection"; 


  }
  
   getItemToCertify(): Observable<AggregatorItemModel[]> {

   this.socket.on('allAssetsDB', (res) => {
      this.aggregatoritems.next(res);
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

  createObservable() : Observable<AggregatorItemModel[]> {
      return Observable.create((observer: Observer<AggregatorItemModel[]>) => {
        this.aggregatoritems = observer;
      });
  }
  
  getObservable() : Observable<AggregatorItemModel> {
      return Observable.create((observer: Observer<AggregatorItemModel>) => {
        this.aggregatoritem = observer;
      });
  }
  
  // Create a bramd new insurelist
  createProductEntry(aggregatoritem: any): any {
	  var pushdata = {
		data: aggregatoritem,
		recordname: this.recordname
	};
	    
   this.socket.on('issuedAsset', (res) => {
      this.aggregatoritem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

  // Create a bramd new insurelist
  transferToAggregator(aggregatoritem: any): void {
	  var pushdata = {
		data: aggregatoritem,
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
