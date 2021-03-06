import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';

import {ProtectedPage} from '../protected-page/protected-page';
import {Storage} from '@ionic/storage';
import {BedsService} from '../../providers/beds-service';

/**
 * Generated class for the RegiobedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-regiobed',
  templateUrl: 'regiobed.html',
})
export class RegiobedPage extends ProtectedPage implements OnDestroy {
  selectedItem: any;
  public beds: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public storage: Storage,
              public bedsService: BedsService) {

      super(navCtrl, navParams, storage);
      /*this.subscription = bedsService.bedsChanged$.subscribe(
              bed_place => {
                this.beds = bedsService.getBeds(bed_place);
              }
            );
*/
// If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('bed');

  }

  ionViewWillEnter() {
    this.beds = this.bedsService.getBeds(this.getAffiliation());
    // this.bedsService.getAll().then(beds => this.beds = beds);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegiobedPage');
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Bed was succesfully (un)booked!',
      showCloseButton: true,
      cssClass: 'succes',
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(RegiobedPage, {
      item: item
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
  //  this.subscription.unsubscribe();
  }
}
