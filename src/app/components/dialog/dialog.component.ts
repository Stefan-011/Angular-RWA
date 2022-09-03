import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private message: string,
    private DialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {}

  GetMessage(): string {
    return this.message;
  }

  CloseDialog(): void {
    this.DialogRef.close();
  }
}
