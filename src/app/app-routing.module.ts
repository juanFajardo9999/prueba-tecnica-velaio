import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'crear-tarea', component: CreateTaskComponent },
  { path: 'listar-tareas', component: TaskListComponent },  
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
