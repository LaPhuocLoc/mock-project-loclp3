import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  computed,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatTableDataSource,
  MatTable,
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements AfterViewInit {
  private service = inject(EmployeeService);
  private dialog = inject(MatDialog);

  // Signal để lưu danh sách nhân viên
  employees = this.service.employees$;

  // Computed signal để tính toán dữ liệu hiển thị
  dataSource = new MatTableDataSource<Employee>();

  displayedColumns: string[] = [
    'no',
    'name',
    'email',
    'department',
    'phone',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Load data
    this.service.loadAll();
    // Mỗi khi service.employees$ thay đổi → cập nhật data
    effect(() => {
      this.dataSource.data = this.service.employees$();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openForm(emp?: Employee) {
    const ref = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: emp ?? null,
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (emp) {
          this.service.update(result as Employee);
        } else {
          this.service.create(result as Omit<Employee, 'id'>);
        }
      }
    });
  }
  searchByName(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredEmployees = this.employees().filter((employee) =>
      employee.name.toLowerCase().includes(input)
    );
    this.dataSource.data = filteredEmployees;
  }
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id);
    }
  }
}
