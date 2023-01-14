import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from 'src/app/core/bases/app-component-base';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { FormService } from 'src/app/core/services/form/form.service';
import { StartupsService } from 'src/app/core/services/satrtup/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit, OnDestroy
{
  isLoggedIn$!: Observable<boolean>;
  sub!: Subscription;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'approve',
    'startupName',
    'city',
    'sectors',
    'founderName',
    'emailAddress',
    'action',
  ];
  dataSource = new MatTableDataSource<Startup>([]);
  selection = new SelectionModel<any>(true, []);
  constructor(
    private router: Router,
    injector: Injector,
    private _startupservice: StartupsService,
    private _usersService: UsersService,
    private _formService: FormService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getNewData();

    this.isLoggedIn$ = this._usersService.isLoggedIn$;
  }
  getNewData() {
    this.sub = this._formService.getAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(Object.values(result));
      this.dataSource._updateChangeSubscription();
    });
  }

  onDeleteRowClicked(id: string) {
   this._formService.delete(id);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  onRowClicked(id:string) {
    this.router.navigate(['/approve/preview-request'],{
      queryParams:{
        id:id,
      }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  approveIt(row: Startup) {
 this._startupservice.create({
   name: row.name,
   city: row.city,
   sectors: row.sectors,
   numberOfEmployees: row.numberOfEmployees,
   websiteUrl: row.websiteUrl,
   emailAddress: row.emailAddress,
 });
  }
  ngOnDestroy() {
    this.sub.unsubscribe()

  }
}
