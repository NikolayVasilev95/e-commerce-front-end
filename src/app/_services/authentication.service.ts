import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        return this.http.post<any>('/api/login', body.toString(), { headers, observe: 'response' })
            .pipe(map(resp => {
                // login if response is successfull
                if (resp.status === 200) {
                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: resp.body.id,
                        name: resp.body.name,
                        firstName: resp.body.firstName,
                        lastName: resp.body.lastName,
                        roles: resp.body.roles
                    }));
                }
                return resp;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        return this.http.get<any>('/api/logout').subscribe(res => {console.log(res)});
    }
}

