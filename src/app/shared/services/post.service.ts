import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {FbCreateResponse, Post} from "../interfaces/interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  }
)
export class PostService{

  constructor(
    private http: HttpClient
  ) {
  }

  public addPost(post: Post): Observable<Post> {
    return this.http.post<Post>( `${environment.fbDbUrl}/posts.json` ,post)
      .pipe(map(
        (response: FbCreateResponse) =>{
          return{
            ...post,
            id: response.name,
            date: new Date(post)
          }
        }
      ))
  }

}
