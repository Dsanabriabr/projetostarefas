import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Info');
    

  }
    showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Uma nova funcionalidade, por meio de um componente Ionic que ainda não tenha sido usado no exemplo.',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Uma nova funcionalidade, por meio de um componente Ionic que ainda não tenha sido usado no exemplo.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'Uma nova funcionalidade, por meio de um componente Ionic que ainda não tenha sido usado no exemplo.',
      duration: 2000,
    });
    toast.present();
}
}
