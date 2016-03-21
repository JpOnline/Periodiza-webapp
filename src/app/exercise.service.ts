import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Exercise} from './exercise';
import {Session} from './session';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ExerciseService {
  constructor(private http: Http) {}

  getSession(nameAndNum: string, date: Date) {
    var sessionsUrl = 'assets/alunos/' + nameAndNum + '.json';
    return this.http.get(sessionsUrl, date)
     .map(res => {
       let sessions = <Session[]> res.json().data;
       let filteredSessions = <Session[]> sessions.filter(
        s => new Date(s.date).getTime() >= date.getTime());
       date.setDate(date.getDate() + 4);
       filteredSessions = filteredSessions.filter(
        s => new Date(s.date).getTime() < date.getTime());
       return filteredSessions[0];
     })
     .do(data => data.date = new Date(data.date))
     .catch(this.handleError);
  }

  getSessions(nameAndNum: string) {
    return this.http.get('assets/alunos/' + nameAndNum + '.json')
		 .map(res => <Session[]> res.json().data) //Decodes json to my session model.
		 .do(data => {
       for (var i = data.length - 1; i >= 0; i--) {
         data[i].date = new Date(data[i].date);
         var d = new Date();
         if (data[i].date > d.setDate(d.getDate() + 4)) {
           data.splice(i, 1);
         }
       }
     })
		 .catch(this.handleError);  //Handles error.
  }

  private handleError(error: Response) {
    let errorMessage;
    if (error.status === 404) {
      errorMessage = `
      Ops, não te achei. Acesse seu treino com
      seu primeiro nome e os 3 primeiros dígitos do seu CPf.
      Por exemplo www.periodiza.com/#/joao123
      `;
    }else {
      errorMessage = 'Desculpe, não encontrei esse treino.';
    }
		return Observable.throw(errorMessage);
	}
}
