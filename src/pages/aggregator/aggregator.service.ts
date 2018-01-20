import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AggregatorItemModel } from './aggregator.model';

@Injectable()
export class AggregatorService {
  constructor(public http: Http) {}
/*

  getPosts(): Promise<FeedPostModel[]> {
    return this.http.get('./assets/example_data/feed.json')
               .toPromise()
               .then(response => response.json().feed as FeedPostModel[])
               .catch(this.handleError);
  } 
*/
  getItemToCertify(): any {
    return this.http.get('./assets/example_data/itemstocertify.json').map(res => res.json().itemstocertify);
               
  }
  
   
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
}
