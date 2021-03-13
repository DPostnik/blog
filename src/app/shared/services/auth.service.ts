import {Injectable} from "@angular/core";
// @ts-ignore
import {User} from "../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()


export class AuthService {
    constructor(private http: HttpClient) {  }

    get token(): string{
      return '';
    }

    login(user: User): Observable<any> {
      return this.http.post('',user);
    }

    isAuthentificated(): boolean{
      return !!this.token;
    }

    logout() {

    }

    private setToken() {

    }
}
