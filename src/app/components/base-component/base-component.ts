import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Класс, уничтожающий подписки
 */
export abstract class BaseComponent implements OnDestroy {

  protected destroyed$: Subject<void> = new Subject();

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
