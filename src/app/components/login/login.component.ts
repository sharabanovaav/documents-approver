import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base-component/base-component';

/**
 * Форма авторизации
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  form: FormGroup;
  isShowError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();
    if (this.authService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.initForm();
    this.subscribeToForm();
  }

  /**
   * Устанавливает пользователя
   */
  submit(): void {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.checkUser(user)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          if (res) {
            this.authService.setUser(user);
            this.router.navigate(['']);
          } else {
            this.isShowError = true;
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Инициализирует форму
   */
  private initForm(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * Подписывается на изменение формы
   */
  private subscribeToForm(): void {
    this.form.valueChanges
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      this.isShowError = false;
    });
  }
}
