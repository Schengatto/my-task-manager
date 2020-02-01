import { MOCKED_TASKS } from './../../mock/tasks';
import { TASKS_STORAGE_KEY } from '../config/contants';
import { Task } from '../models/task';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFilters } from './../models/search-form';
import { ArrayUtils } from './../../utils/array-utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private router: Router) {
    if (!window.localStorage.getItem(TASKS_STORAGE_KEY)) {
      this.initTasks();
    }
  }

  /**
   * Retrieve the task list and apply the SearchFilters.
   * @param filters
   */
  getTasks(filters: SearchFilters): Task[] {
    const localStorageValue = window.localStorage.getItem(TASKS_STORAGE_KEY);
    let tasks = localStorageValue ? JSON.parse(localStorageValue) : [];

    if (!!filters) {
      // Apply Title and Description filter
      if (!!filters.titleOrDescription) {
        tasks = tasks.filter(
          tsk =>
            tsk.title
              .toLowerCase()
              .includes(filters.titleOrDescription.toLowerCase()) ||
            tsk.description
              .toLowerCase()
              .includes(filters.titleOrDescription.toLowerCase())
        );
      }

      // Apply Expiration Date From filter
      if (!!filters.expirationDateFrom) {
        tasks = tasks.filter(
          tsk => tsk.expirationDate >= filters.expirationDateFrom
        );
      }

      // Apply Expiration Date To filter
      if (!!filters.expirationDateTo) {
        tasks = tasks.filter(
          tsk => tsk.expirationDate <= filters.expirationDateTo
        );
      }

      // Apply Order by filter
      tasks = ArrayUtils.orderAscByProperty(tasks, filters.orderBy);
    }

    return tasks;
  }

  /**
   * Retrieve the task with the id provided as param.
   * @param taskId
   */
  getTask(taskId: number): Task {
    return this.getTasks(null).find(task => task.id === taskId);
  }

  /**
   * Navigate to the details page of the task with the id provided as param.
   * @param taskId
   */
  showTaskDetails(taskId: number): void {
    this.router.navigate(['/details', taskId]);
  }

  /**
   * Save the task provided as input in the datasource.
   * Then the user will be redirect to the taks list page.
   * @param task
   */
  updateTask(task: Task): void {
    this.saveTask(task);
    this.navigateToList();
  }

  /**
   * Remove the task with the id provided as param.
   * Then the user will be redirect to the taks list page.
   * @param taskId
   */
  deleteTask(taskId: number): void {
    const taskList = this.getTasks(null).filter(task => task.id !== taskId);
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskList));
    this.navigateToList();
  }

  /**
   * Navigate to the task list.
   * @param taskId
   */
  navigateToList(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Navigate to the task creation page.
   * @param taskId
   */
  navigateToTaskCreation(): void {
    this.router.navigate(['/create']);
  }

  /**
   * Navigate to the task edit page of the task with the id provided as param.
   * @param taskId
   */
  navigateToTaskEdit(taskId: number): void {
    this.router.navigate(['/edit', taskId]);
  }

  /**
   * This method load the Mock examples at the first run of this applicaiton.
   */
  private initTasks(): void {
    console.warn(
      'Chiave task non trovata nello storage... vengono caricati i task mockati'
    );
    window.localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(MOCKED_TASKS)
    );
  }

  /**
   * Save the provied task in the localstorage.
   * @param task
   */
  private saveTask(task: Task): void {
    let taskList = this.getTasks(null);

    const taskToUpdate: Task = this.getTask(task.id);
    if (!!taskToUpdate) {
      taskList = taskList.filter(t => t.id !== taskToUpdate.id);
      task.id = taskToUpdate.id;
    }
    taskList.push(task);

    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskList));
  }
}
