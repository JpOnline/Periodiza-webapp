import {Component, OnInit, Injector} from 'angular2/core';
import {Exercise} from '../exercise';
import {Session} from '../session';
import {ExerciseService} from '../exercise.service';
import {RouteParams, Router} from 'angular2/router';

@Component({
  selector: 'session-list',
  template: `
    <div *ngIf="errorMessage" class="col-lg-12 text-center">
      <h1>{{errorMessage}}</h1>
    </div>

    <h1 *ngIf="!errorMessage">Todas as sessões</h1>
    <div class="list-group">
      <a *ngFor="#session of sessions" (click)="gotoSession(session)"
      style="cursor:pointer;" class="list-group-item">{{session.date | date}}</a>
    </div>
  `
})
export class SessionList implements OnInit {
  errorMessage: string;
  sessions: Session[] = [];

  constructor(
    private _exerciseService: ExerciseService,
    private _router: Router,
    private _injector: Injector
  ) { }

  ngOnInit() {
    let nameAndNum = this._injector.parent.parent
     .get(RouteParams)
     .get('nameAndNum');
    this.getSessions(nameAndNum);
  }

	getSessions(nameAndNum: string) {
		this._exerciseService.getSessions(nameAndNum)
			.subscribe(
				sessions => this.sessions = sessions,
				error => {
          this.errorMessage = <any>error;
        }
		);
  }

  gotoSession(session: Session) {
    let link = ['Session', {date: session.date.toISOString().slice(0, 10)}];
    this._router.navigate(link);
  };
}
