import {Component, OnInit, Injector} from 'angular2/core';
import {Exercise} from '../exercise';
import {Session} from '../session';
import {ExerciseService} from '../exercise.service';
import {RouteParams, RouteData} from 'angular2/router';

@Component({
  selector: 'session',
  styles: [`
    .panel *{
      color: white;
      padding-right: 10px;
      padding-left: 10px;
      margin-top: 10px;
    }

    .green{
      background-color: #3bbab5 !important;
    }

    .yellow{
      background-color: #BAAA3B !important;
    }
  `],
  template: `
    <div class="row">

      <div *ngIf="errorMessage" class="col-lg-12 text-center">
        <h3>{{errorMessage}}</h3>
      </div>

      <div *ngIf="session" class="col-lg-12 text-center">
          <h1><strong>{{session?.name}}</strong></h1>
          <h3><strong>{{session?.date | date:'dd'}}/{{session?.date | date:'MMyyyy'}}</strong></h3>
      </div >

      <!-- start: right panel -->
      <aside *ngIf="session?.duration" class="col-md-5 col-md-push-7" style="margin-bottom: 8px;">
        <div class="row">
          <div class="col-lg-12">
            <div class="panel yellow">
              <table class="table" rules="none">
                <tbody>
                  <tr>
                    <td>
                      <h2><strong>Dura&ccedil;&atilde;o do treino</strong></h2>
                    </td>
                    <td>
                      <h2>{{session?.duration}}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2><strong>Repeti&ccedil;&otilde;es por s&eacute;rie</strong></h2>
                    </td>
                    <td>
                      <h2>{{session?.repsPerSet}}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2><strong>Descanso</strong></h2>
                    </td>
                    <td>
                      <h2>{{session?.rest*1000 | date:'mmss'}}</h2>
                    </td>
                  </tr>
                </tbody >
              </table>
            </div>
          </div >
        </div ><!-- .row -->
      </aside >
      <!-- end: right panel -->

      <!-- start: exercises list -->
      <div class="col-md-7 col-md-pull-5">
        <div *ngFor="#exercise of session?.exercises" class="row">
          <div class="col-lg-12">
            <div class="panel green">
              <h1>{{exercise.name}}</h1><hr>
              <h3><strong>S&eacute;ries</strong> {{exercise.sets}}</h3>
              <h3><strong>Peso</strong> {{exercise.weight}}</h3>
            </div>
          </div >
      </div >
      <!-- end: exercises list -->

    </div><!--/.row-->
  `,
})
export class SessionComponent implements OnInit {
  constructor(
    private _exerciseService: ExerciseService,
    private _routeData: RouteData,
    private _routeParams: RouteParams,
    private _injector: Injector
  ) { }

  errorMessage: string;
  session: Session;

	ngOnInit() {
    var date = new Date(); // Today.
    //Yesterday, it's needed because of the time of Date() got in function.
    date.setDate(date.getDate() - 1);
    let dateString = this._routeParams.get('date');
    if (dateString != null) { //Create the today date if empty.
      date = new Date(dateString.replace(/-/g, '/'));
    }
    let nameAndNum = this._injector.parent.parent
     .get(RouteParams)
     .get('nameAndNum');
		this.getSession(nameAndNum, date);

	}

  getSession(nameAndNum: string, date: Date) {
    this._exerciseService.getSession(nameAndNum, date)
      .subscribe(
        session => {
          this.session = session;
          //Code to show the session duration properly, it shouldn't be
          //necessary when Angular2 supports other locales than en. And
          //them the pipe date should be used {{session?.duration| date:
          //'HHmmss'}}
          let hours = Math.floor(this.session.duration / 3600);
          let minutes = Math.floor(this.session.duration / 60) - hours * 60;
          let hoursString = hours < 10 ? '0' + hours : '' + hours;
          let minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
          this.session.duration = '' + hoursString + ':' + minutesString + ':00';
        },
        error => this.errorMessage = <any>error
      );

  }
}
