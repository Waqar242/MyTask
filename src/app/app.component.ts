import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Messages } from './messages';
import { Tasks } from './Tasks';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmationBoxComponent } from './shared/component/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myGroup = new FormGroup({
    tasks: new FormControl(''),
    date: new FormControl(''),
    reminder: new FormControl(false)
  });
  myTasks: Tasks[] = []; 
  add: Boolean = false;
  index: number = 0;
  addStatus: string = 'Add';
  updateStatus: string = 'Save Task';
  updateIndex: number = 0;
  toggle1: boolean | undefined;
  toggle2: boolean | undefined;
  toggle3: boolean | undefined;
  checked = false;

  constructor(public dialog: MatDialog) {
  }
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, index: number): void {
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => { 
      if(result)
      {
        if(this.add == false)
        {
          this.add = !this.add;
        }
        this.toggle2 = !this.toggle2;
        this.myGroup.controls.tasks.setValue(this.myTasks[index].tasks);
        this.myGroup.controls.date.setValue(this.myTasks[index].date);
        this.myGroup.controls.reminder.setValue(this.checked);
        this.updateIndex = index;
      }
    });
  }
  onSubmit() {
    let obj = {
      'tasks': this.myGroup.controls.tasks.value,
      'date': this.myGroup.controls.date.value,
      'reminder': this.checked
    };
    this.myTasks.push(obj);
    this.myGroup.controls.tasks.setValue('');
    this.myGroup.controls.date.setValue('');
    this.print();
  }
  deleteTasks(index: any){
    this.myTasks.splice(index, 1);
    this.myGroup.controls.tasks.setValue('');
    this.myGroup.controls.date.setValue('');
    console.log(index)
  }
  editTasks(index: any){
    this.openDialog('0ms', '0ms', index);
  }
  updateTasks(){
    this.myTasks[this.updateIndex].tasks = this.myGroup.controls.tasks.value;
    this.myTasks[this.updateIndex].date = this.myGroup.controls.date.value;
    this.myGroup.controls.tasks.setValue('');
    this.myGroup.controls.date.setValue('');
    this.myGroup.controls.reminder.setValue(false);
    this.toggle2 = !this.toggle2;
  }
  addToggle()
  {
      this.add = !this.add;
      this.toggle1 = !this.toggle1;
      this.toggle3 = !this.toggle3;
      this.addStatus = !this.toggle1 ? 'Add' : 'Cancel';
  }
  print()
  {
    for (this.index = 0 ; this.index < this.myTasks.length ; this.index ++)
    {
      console.log(this.myTasks[this.index].tasks);
      console.log(this.myTasks[this.index].date);
      console.log(this.myTasks[this.index].reminder);
    }
  }
}
