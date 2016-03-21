import {Exercise} from './exercise';

export interface Session{
  name: string;
  date: any;
  duration: any; //In seconds.
  repsPerSet: string;
  rest: number; //In seconds.
  exercises: Exercise[];
}
