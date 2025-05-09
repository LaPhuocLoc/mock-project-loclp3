import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/employees';

  // Signal để lưu trữ danh sách nhân viên
  private employees = signal<Employee[]>([]);

  // Getter để truy cập danh sách nhân viên
  get employees$() {
    return this.employees.asReadonly();
  }

  // Load tất cả nhân viên
  loadAll(): void {
    this.http.get<Employee[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Failed to load employees:', error);
        return of([]); // Trả về danh sách rỗng nếu lỗi
      })
    ).subscribe((list) => {
      this.employees.set(list);
    });
  }

  // Tạo mới nhân viên
  create(employee: Omit<Employee, 'id'>): void {
    this.http.post<Employee>(this.baseUrl, employee).pipe(
      catchError((error) => {
        console.error('Failed to create employee:', error);
        return of(null); // Trả về null nếu lỗi
      })
    ).subscribe((newEmp) => {
      if (newEmp) {
        this.employees.update((current) => [...current, newEmp]);
      }
    });
  }

  // Cập nhật nhân viên
  update(employee: Employee): void {
    this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee).subscribe((updated) => {
      this.employees.update((current) =>
        current.map((e) => (e.id === updated.id ? updated : e))
      );
    });
  }

  // Xóa nhân viên
  delete(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`).subscribe(() => {
      this.employees.update((current) => current.filter((e) => e.id !== id));
    });
  }
}