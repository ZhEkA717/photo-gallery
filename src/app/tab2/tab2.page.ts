import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../services/photo.service";
import {UserPhoto} from "../services/photo.interfaces";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.photoService.loadSaved().then();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery().then()
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: this.photoService.deletePicture.bind(this.photoService, photo, position)
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }
}
