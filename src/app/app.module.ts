import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { AuctionService } from '../pages/auctionitems/auction.service';
import { AuctionListPage } from '../pages/auctionitems/list';
import { AuctionItemDetailsPage } from '../pages/auctionitems/item-details/item-details';

import { TradeService } from '../pages/tradeitems/trade.service';
import { TradeListPage } from '../pages/tradeitems/list';
import { TradeItemDetailsPage } from '../pages/tradeitems/item-details/item-details';

import { AuctionPoolService } from '../pages/auctionpool/auctionpool.service';
import { AuctionPoolListPage } from '../pages/auctionpool/list';
import { AuctionPoolItemDetailsPage } from '../pages/auctionpool/item-details/item-details';

import { AggregatorService } from '../pages/aggregator/aggregator.service';
import { AggregatorListPage } from '../pages/aggregator/list';
import { AggregatorItemDetailsPage } from '../pages/aggregator/item-details/item-details';

import { SellerListPage } from '../pages/selleritems/list';
import { SellerItemDetailsPage } from '../pages/selleritems/item-details/item-details';
import { SellerService } from '../pages/selleritems/seller.service';

import { ProducerEntryPage } from '../pages/producerentry/producer-entry';



import { FeedPage } from '../pages/feed/feed';
import { FeedService } from '../pages/feed/feed.service';
import { Http } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	AuctionListPage,
	TradeItemDetailsPage,
	TradeListPage,
	AuctionPoolListPage,
	AuctionPoolItemDetailsPage,
	AggregatorListPage,
	AggregatorItemDetailsPage,
	AuctionItemDetailsPage,
	SellerListPage,
	ProducerEntryPage,
	SellerItemDetailsPage,
	FeedPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	AuctionListPage,
	AuctionItemDetailsPage,
	TradeItemDetailsPage,
	AuctionPoolListPage,
	AuctionPoolItemDetailsPage,
	AggregatorListPage,
	AggregatorItemDetailsPage,
	SellerListPage,
	ProducerEntryPage,
	SellerItemDetailsPage,
	TradeListPage,
	FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	FeedService,
	AuctionService,
	AggregatorService,
	AuctionPoolService,
	SellerService,
	TradeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
