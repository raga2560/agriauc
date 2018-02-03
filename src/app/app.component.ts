import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { FeedPage } from '../pages/feed/feed';
import { AuctionListPage } from '../pages/auctionitems/list';
import { TradeListPage } from '../pages/tradeitems/list';
import { AuctionPoolListPage } from '../pages/auctionpool/list';
import { AuctionTestPage } from '../pages/auctiontest/auction-test';
import { SellerListPage } from '../pages/selleritems/list';
import { ProducerEntryPage } from '../pages/producerentry/producer-entry';
import { AggregatorListPage } from '../pages/aggregator/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
//      { title: 'Hello Ionic', component: HelloIonicPage },
	  { title: 'Consumer Menus', component: null },
	  { title: 'AuctionList', component: AuctionListPage },
	  { title: 'TradeList', component: TradeListPage },
	  { title: 'Aggregator Menus', component: null },
	  
	  { title: 'Aggregator', component: AggregatorListPage },
	  
	  { title: 'Auctioner Menus', component: null },
	  { title: 'Auctioner test', component: AuctionTestPage },
	  { title: 'AuctionPool', component: AuctionPoolListPage },
	  { title: 'Producer Menus', component: null },
	  { title: 'ProducerEntry', component: ProducerEntryPage },
	  { title: 'SellerList', component: SellerListPage }  //,
	  
	  
	//  { title: 'Feed', component: FeedPage },
    //  { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
	if(page.component != null){
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
	}
  }
}
