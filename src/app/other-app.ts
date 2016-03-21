import {Component} from 'angular2/core';

@Component({
  selector: 'other-app',
  template: ''
})
export class OtherApp {
	constructor() {
    window.location.href = 'http://periodiza.wix.com/blog';
  }
}
