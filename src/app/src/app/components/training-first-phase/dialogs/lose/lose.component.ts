import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})
export class LoseComponent {

  loseMessage: string = "";

  constructor(private dialogRef: MatDialogRef<LoseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {  
    // this.loseMessage = `Congratulations, you did ${data.numberOperations} operations, good job :3<br> Final score: ${Math.floor(data.score)} points`
  }

  ngOnInit() {  
    console.log(this.data);
    this.loseMessage = `Congratulations, you did ${this.data.numberOperations} operations, good job :3<br> Final score: ${Math.floor(this.data.score)} points`
  }

  public onRestart(): void {
    this.dialogRef.close("reload");
  }
  public onMenu(): void {
    this.router.navigateByUrl("", { skipLocationChange: true });
    this.dialogRef.close();
  }

}
