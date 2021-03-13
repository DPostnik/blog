import {Injectable} from "@angular/core";
// @ts-ignore
import {User} from "../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {FbAuthResponse} from "../../../environments/interfaces";

@Injectable()


export class AuthService {
    constructor(private http: HttpClient) {  }

    get token(): string{
      const expDate = new Date(localStorage.getItem("auth-token-exp"));
      if(new Date() > expDate)
      {
        this.logout();
        return null;
      }
      return localStorage.getItem("auth-token");
    }

    login(user: User): Observable<any> {
      user.returnSecureToken = true;
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
        .pipe(
          tap(this.setToken)
        )
    }

    isAuthentificated(): boolean{
      return !!this.token;
    }

    logout() {
      this.setToken(null);
    }

    private setToken(response: FbAuthResponse | null) {
      if (response) {
        const expDate = new Date(new Date().getTime() + +response.expiresIn);
        localStorage.setItem('auth-token', response.idToken);
        localStorage.setItem('auth-token-exp', response.expiresIn.toString());
      } else{
        localStorage.clear();
      }
    }
}
