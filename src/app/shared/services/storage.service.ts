import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private key: string = "usr-barka";

  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  getByKey() {
    return JSON.parse(localStorage.getItem(this.key) || '{}') || {};
  }

  set(value: any): boolean {
    localStorage.setItem(this.key, JSON.stringify(value));
    return true;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeByKey() {
    localStorage.removeItem(this.key);
  }


  clear() {
    localStorage.clear();
  }

}

export class MemoryStorageService {
  private store = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
