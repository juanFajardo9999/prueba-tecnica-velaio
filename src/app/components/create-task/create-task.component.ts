import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)
  private managerService = inject(ManagerService);

  taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskName: ['', [Validators.required]],
      limitDate: ['', [Validators.required]],
      persons: this.formBuilder.array([], this.validatePersonsArray)
    });
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }


  createPerson(): FormGroup {
    return this.formBuilder.group({
      personName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.formBuilder.array([])
    });
  }


  createSkill(): FormGroup {
    return this.formBuilder.group({
      skill: ['', [Validators.required]]
    });
  }


  addPerson(): void {
    this.persons.push(this.createPerson());
  }


  removePerson(index: number): void {
    this.persons.removeAt(index);
  }


  getSkills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }


  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.createSkill());
  }


  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  validatePersonsArray(control: AbstractControl) {
    const personsArray = control as FormArray;
    const names = personsArray.controls.map(person => person.get('personName')?.value);
    const nameSet = new Set(names);

    // Verificar si hay nombres repetidos
    if (nameSet.size !== names.length) {
      return { duplicateNames: true };
    }

    // Verificar si cada persona tiene al menos una habilidad
    for (const personControl of personsArray.controls) {
      const skillsArray = personControl.get('skills') as FormArray;
      if (skillsArray.length === 0) {
        return { noSkills: true };
      }
    }

    return null;
  }

 
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
  
      const newTask: Task = {
        name: formValue.taskName,
        date: new Date(formValue.limitDate),
        persons: formValue.persons.map((person: any) => ({
          name: person.personName,
          age: person.age,
          skills: person.skills.map((skill: any) => ({
            name: skill.skill
          }))
        })),
        state: 'pendiente'
      };
  

      this.managerService.addTask(newTask).subscribe({
        next: (task) => {
          console.log('Tarea agregada:', task);
          this.router.navigate(['/listar-tareas']);
        },
        error: (err) => {
          console.error('Error al agregar la tarea:', err);
        }
      });
    } else {
      console.error('El formulario no es válido.');
    }
  }
  
}

