import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/interfaces/task';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks; 
    });
  }


  filterTasks(filter: string): void {
    if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.state === 'completada');
    } else if (filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => task.state === 'pendiente');
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  changeTaskState(task: Task, newState: string): void {
    task.state = newState;
    this.managerService.updateTask(task.id, task).subscribe(updatedTask => {
      console.log('Estado de la tarea actualizado:', updatedTask);
    });
  }
}
