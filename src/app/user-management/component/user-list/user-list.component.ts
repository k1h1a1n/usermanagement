import { Component, OnInit, ViewChild } from '@angular/core';
import { UserlistService } from '../../services/userlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userlistService : UserlistService) { }
  UsersList:any
  displayedColumns: string[] = ['Name', 'Email' , 'Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.GetUsers();
  }
  GetUsers(){
    this.userlistService.GetUsers().subscribe(result => {
      this.dataSource.data = result;
      this.UsersList = result;
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
}
