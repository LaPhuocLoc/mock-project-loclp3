import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  private dialogRef = inject(MatDialogRef<EmployeeFormComponent>);
  public data = inject(MAT_DIALOG_DATA) as Employee | null;
  private fb = inject(FormBuilder);

  // Signal để lưu trạng thái form
  private formState = signal({
    name: this.data?.name ?? '',
    email: this.data?.email ?? '',
    department: this.data?.department ?? '',
    phone: this.data?.phone ?? '',
  });

  // Reactive Form
  form = this.fb.group({
    name: [this.formState().name, Validators.required],
    email: [this.formState().email, [Validators.required, Validators.email]],
    department: [this.formState().department, Validators.required],
    phone: [
      this.formState().phone,
      [Validators.required, Validators.pattern(/^\d{11}$/)], // Số điện thoại 11 chữ số
    ],
  });

  // Computed signal để kiểm tra form hợp lệ
  isFormValid = computed(() => this.form.valid);

  save() {
    if (!this.isFormValid()) {
      return;
    }
  
    const formValue = this.form.getRawValue() as {
      name: string;
      email: string;
      department: string;
      phone: string;
    };
  
    if (this.data) {
      const updated: Employee = { id: this.data.id, ...formValue };
      this.dialogRef.close(updated);
    } else {
      const created = formValue as Omit<Employee, 'id'>;
      this.dialogRef.close(created);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}