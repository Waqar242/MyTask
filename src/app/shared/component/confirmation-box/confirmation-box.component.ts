import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationBoxComponent>) {}

  ngOnInit(): void {
  }
  onConfirm(): void {

    // Close the dialog, return true
    debugger
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
