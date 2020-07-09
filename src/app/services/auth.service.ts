import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from '../models/user';

const MOCK_USER: User = {
  login: 'ivanov',
  password: 'ivanov'
};

/**
 * Сервис авторизации
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCode = 'docApprUser';

  /**
   * Возвращает пользователя, если он есть
   */
  getUser(): User | null {
    const user = localStorage.getItem(this.userCode);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Устанавливает пользователя
   */
  setUser(user: User): void {
    localStorage.setItem(this.userCode, JSON.stringify(user));
  }

  /**
   * Проверяет данные пользователя
   */
  checkUser(user: User): Observable<boolean> {
    return of(JSON.stringify(user) === JSON.stringify(MOCK_USER));
  }

  /**
   * Обрабатывает logout
   */
  logout(): void {
    localStorage.removeItem(this.userCode);
  }
}
