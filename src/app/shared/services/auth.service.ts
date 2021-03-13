import {Injectable} from "@angular/core";
// @ts-ignore
import {User} from "../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()


export class AuthService {
    constructor(private http: HttpClient) {  }

    get token(): string{
      return '';
    }

    login(user: User): Observable<any> {
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
        .pipe(
          tap(this.setToken)
        )
    }

    isAuthentificated(): boolean{
      return !!this.token;
    }

    logout() {

    }

    private setToken(response) {
      console.log(response);
    }
}
