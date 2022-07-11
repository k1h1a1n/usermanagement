import { Component, OnInit, ViewChild } from '@angular/core';
import { UserlistService } from '../../services/userlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserList } from '../../models/userlist';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  createInput: UserList = new UserList();
  editForm!: FormGroup;
  UsersList:any
  displayedColumns: string[] = ['Name', 'Email' , 'Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  constructor(private userlistService : UserlistService , private dialog: MatDialog,private formBuilder: FormBuilder,) { 
    this.editForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null , [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.GetUsers();
  }
  get controller(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }
  GetUsers(){
    this.userlistService.GetUsers().subscribe(result => {
      this.UsersList = result;
      this.dataSource.data = this.UsersList;
      console.log(this.UsersList , "got it from api");
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onAdd(Dialogue:any){
    this.dialog.open(
      Dialogue, {
        disableClose: true,
      }
    )
  }
  onDelete(selectedValue:any){
    console.log(selectedValue.id);
    this.userlistService.deleteUser(selectedValue.id).subscribe(result => {
      console.log(result)
    })
  }
  onSubmit(FormValue: any) {
    console.log(this.editForm);
    if (this.editForm.invalid) {
      for (const control of Object.keys(this.editForm.controls)) {
        this.editForm.controls[control].markAsTouched();
      }
      return;
    }
    this.createInput.first_name = FormValue.name;
    this.createInput.last_name = "khan";
    this.createInput.birth_date = "1997-08-23T18:30:00.000Z";
    this.createInput.age = 23;
    this.createInput.address= "address";
    this.createInput.role = "role";
    this.createInput.email = FormValue.email;
    console.log(this.createInput , "input")
    this.userlistService.createUser(this.createInput).subscribe(result => {
      console.log(result, "create")
    })
    this.dialog.closeAll();
  }
}
