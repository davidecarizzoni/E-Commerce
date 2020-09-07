import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from '../http-communication/http-communication.service';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpCommunications: HttpCommunicationsService) { }

  insertUser(user: User): Observable<User>{
    return this.httpCommunications.retrievePostCall("users", user);
  }
}
