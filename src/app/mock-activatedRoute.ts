import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  private subject = new BehaviorSubject<Params>({});

  paramMap = this.subject.asObservable();

  setParamMap(params: Params) {
    this.subject.next(params);
  }
}
