import { MOCKED_TASKS } from './../../mock/tasks';
import { TASKS_STORAGE_KEY } from '../config/contants';
import { Task } from '../models/task';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private router: Router) {
    if (!window.localStorage.getItem(TASKS_STORAGE_KEY)) {
      this.initTasks();
    }
  }

  getTasks(): Task[] {
    const localStorageValue = window.localStorage.getItem(TASKS_STORAGE_KEY);
    return localStorageValue ? JSON.parse(localStorageValue) : [];
  }

  getTask(taskId: number): Task {
    return this.getTasks().find(task => task.id === taskId);
  }

  showTaskDetails(taskId: number): void {
    this.router.navigate(['/details', taskId]);
  }

  createTask(task: Task): void {
    this.saveTask(task);
    this.navigateToList();
  }

  editTask(task: Task): void {
    this.saveTask(task);
    this.navigateToList();
  }

  deleteTask(taskId: number): void {
    const taskList = this.getTasks().filter(task => task.id !== taskId);
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskList));
    this.navigateToList();
  }

  navigateToList(): void {
    this.router.navigate(['/tasks']);
  }

  navigateToTaskCreation(): void {
    this.router.navigate(['/create']);
  }

  navigateToTaskEdit(taskId: number): void {
    this.router.navigate(['/edit', taskId]);
  }

  private initTasks(): void {
    console.warn(
      'Chiave task non trovata nello storage... vengono caricati i task mockati'
    );
    window.localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(MOCKED_TASKS)
    );
  }

  private saveTask(task: Task): void {
    let taskList = this.getTasks();

    const taskToUpdate: Task = this.getTask(task.id);
    if (!!taskToUpdate) {
      taskList = taskList.filter(t => t.id !== taskToUpdate.id);
      task.id = taskToUpdate.id;
    }
    taskList.push(task);

    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskList));
  }
}
