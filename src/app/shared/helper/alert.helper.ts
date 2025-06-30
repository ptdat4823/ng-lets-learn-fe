import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '@shared/components/alert/alert.component';

export function openAlertDialog(
  dialog: MatDialog,
  title: string,
  message: string,
  confirmText: string = 'OK',
  cancelText: string = 'Cancel',
  showCancel: boolean = true
): Promise<boolean> {
  const dialogRef = dialog.open(AlertComponent, {
    data: { title, message, confirmText, cancelText, showCancel },
    panelClass: 'custom-alert-dialog',
    disableClose: true,
  });
  return dialogRef.afterClosed().toPromise().then(result => !!result);
}
