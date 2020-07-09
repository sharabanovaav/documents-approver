import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { Document } from '../../models/document';
import { pluck, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State } from '../../models/confirm-data';
import { BaseComponent } from '../base-component/base-component';
import { RESOLUTIONS } from 'src/app/constants/resolutions';

/**
 * Форма согласования документа
 */
@Component({
  selector: 'app-document-approver',
  templateUrl: './document-approver.component.html',
  styleUrls: ['./document-approver.component.scss']
})
export class DocumentApproverComponent extends BaseComponent implements OnInit {
  user: User;
  document: Document;
  form: FormGroup;
  state = State;
  documentId = 1;
  isConfirmed = false;
  resolutions = RESOLUTIONS;
  confirmationText: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private documentService: DocumentService,
    private fb: FormBuilder,
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getDocument();
  }

  /**
   * Разлогиниться
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Утвердить документ
   */
  submit(state: State): void {
    const data = {
      ...this.form.value,
      approver: this.user.login,
      state,
    };

    this.documentService.confirm(data)
    .pipe(pluck('data'), takeUntil(this.destroyed$))
    .subscribe(res => {
      this.isConfirmed = true;
      this.confirmationText = res;
    });
  }

  /**
   * Получить документ
   */
  private getDocument(): void {
    this.documentService.getDocument(this.documentId)
      .pipe(pluck('data'), takeUntil(this.destroyed$))
      .subscribe(res => {
        this.document = res;
      });
  }

  /**
   * Инициализировать форму
   */
  private initForm(): void {
    this.form = this.fb.group({
      resolution: 'fully_agree',
      comment: null
    });
  }
}
