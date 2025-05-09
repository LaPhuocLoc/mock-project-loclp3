import { Routes } from '@angular/router';
import { SwaggerUiComponent } from './components/swagger-ui/swagger-ui.component';
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'docs', component: SwaggerUiComponent },
  { path: '**', redirectTo: 'employees' },
];
