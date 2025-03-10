import { Component, Inject, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ServiceCreditApplicationService } from '../../service/service-credit-application.service';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormsModule } from '@angular/forms';
import { Credit } from '../../Modelos/Credit';

@Component({
  selector: 'app-credit-list',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'numero-identificacion', 'tipo-credito', 'cantidad', 'accion'];
  dataSource : any;
  result: any;
  constructor(private client: ServiceCreditApplicationService, private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar, private router:Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
        this.getCreditListDataSource();
    }

  getCreditListDataSource() {
    this.client.getNonApprevedCreditList().subscribe(res => {
      this.dataSource = res;
    });
  }

  openDialog(credit: Credit): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: credit,
      height: '25rem',
      width: '60rem',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.client.changeCreditStatus({
        id: credit.id,
        isApproved: result
      }).subscribe(res => {
        this.confirmsCreditChangeOfStatus(result);
      });
    });
  }

  confirmsCreditChangeOfStatus(result: boolean) {
    this._snackBar.open("Estado de Credito Actualizado", "Ok");
    this.getCreditListDataSource();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onApprovedClick(): void {
    this.dialogRef.close(true);
  }
}
