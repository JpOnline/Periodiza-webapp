import {Component} from 'angular2/core';
import {EndUserApp} from './end-user-app';
import {OtherApp} from './other-app';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@RouteConfig([
  {
    path: '/',
    name: 'OtherApp',
    component: OtherApp
  },
  {
    path: '/:nameAndNum/...',
    name: 'EndUserApp',
    component: EndUserApp,
    useAsDefault: true
  }
])
@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  styles: [`
    footer{
      color: white;
      background-color: #212121;
      display: table-row;
    }
  `],
  template: `
    <router-outlet></router-outlet>

    <!-- <footer class="footer" style="padding: 15px;"> -->
    <!-- <div class="container"> -->
    <!-- <img class="text-center" src="assets/img/periodiza-logo.png" height="20px"></img > -->
    <!-- <p class="text&#38;#45;muted">blabla</p> -->
    <!-- </div> -->
    <!-- </footer> -->
  `,
})
export class App {
	constructor() { }
}
