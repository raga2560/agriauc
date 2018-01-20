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
	AuctionItemDetailsPage,
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
	TradeListPage,
	FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	FeedService,
	AuctionService,
	TradeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
