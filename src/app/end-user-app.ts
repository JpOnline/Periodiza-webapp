import {Component, OnInit} from 'angular2/core';
import {Exercise} from './exercise';
import {SessionComponent} from './session/session.component';
import {ExerciseService} from './exercise.service';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {SessionList} from './session-list/session-list';

@RouteConfig([
  {
    path: '/',
    name: 'Session',
    component: SessionComponent,
    data: {nameAndNum: 'nameAndNum'},
    useAsDefault: true
  },
  {
    path: '/all',
    name: 'SessionList',
    component: SessionList,
  }
])
@Component({
  directives: [SessionComponent, SessionList, ROUTER_DIRECTIVES],
	providers: [
		ExerciseService,
	],
  styles: [`
    @font-face{
      font-family: weblysleekuil;
      src: url(assets/font/weblysleekuil.ttf);
    }

    *{
      font-family: weblysleekuil, georgia, helvetica, arial;
    }
  `],
  template: `
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Sua academia</a >
          <button type="button" class="navbar-toggle collapsed"
          data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div ><!-- .navbar-header-->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a [routerLink]="['SessionList']">Lista</a></li>
            <li><a [routerLink]="['Session', {date:tmp}]">Próxima sessão</a></li>
          </ul>
        </div>
      </div ><!-- .container&#45;fluid -->
    </nav >

    <div class="container-fluid" style="height: 100%;">
      <router-outlet></router-outlet>
    </div><!--/.container-fluid-->
  `,
})
export class EndUserApp implements OnInit {
	constructor() { }
  tmp: string;

  ngOnInit() {
    var d = new Date();
    this.tmp = d.toISOString().slice(0, 10);
  }
}
