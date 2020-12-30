import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})

export class NewDialogComponent implements OnInit {

  newFacility = new FormGroup({
    facilityName:new FormControl('', [Validators.required]),
    shortCode:new FormControl('', [Validators.required]),
    idDs:new FormControl('', [Validators.required]),
    activity:new FormControl(false),
  });

  constructor(
    private facilityService:FacilitiesService,
    private shareDataService:ShareDataService,
    private dialog:MatDialogRef<NewDialogComponent>
    ) { }

  ngOnInit(): void {
  }

  addFacility(): void {
    this.shareDataService.setAddedState(true);
    const DATA = JSON.parse(JSON.stringify(this.newFacility.getRawValue()));
    // console.log(`Data - ${DATA}`);
    this.facilityService.addData(DATA).toPromise().then(result => console.log(`Result - ${result}`));
    this.dialog.close();
  }

}