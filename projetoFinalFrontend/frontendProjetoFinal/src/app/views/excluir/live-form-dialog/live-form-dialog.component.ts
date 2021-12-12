import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Produto } from "src/app/models/produto";


@Component({
  selector: "app-live-form-dialog",
  templateUrl: "./live-form-dialog.component.html",
  styleUrls: ["./live-form-dialog.component.css"],
})
export class LiveFormDialogComponent implements OnInit {
  @Output() confirmarExclusao = new EventEmitter();
  simConfirma: string;

  produtos: Produto[] = [];


  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>) {}

  ngOnInit(): void {}

  cancelar(): void {
    this.dialogRef.close();
  }


}
