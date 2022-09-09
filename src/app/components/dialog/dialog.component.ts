import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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

export function OpenDialog(msg: string, matDialog: MatDialog): void {
  matDialog
    .open(DialogComponent, {
      data: msg,
    })
    .updatePosition({ top: '10%' });
}
