import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { User } from '@core/authentication/interface';
import { environment } from '@env/environment';

// function generateToken(user: User) {
//   return btoa([user.id, user.email, user.name].join(''));
// }

function is(reqInfo: RequestInfo, path: string) {
  if (environment.baseUrl) {
    return false;
  }
  return new RegExp(`${path}(/)?$`, 'i').test(reqInfo.req.url);
}

@Injectable({
  providedIn: 'root',
})
export class InMemDataService
// implements InMemoryDbService
 {
  private users: User[] = [{
    id: 1,
    login: "canpintam100143",
    nom: "Caitson",
    prenom: "Canpintam",
    telephone: "unknown",
    email: "canpintam@orange-sonatel.com",
    profile: "unknown",
    etat: false,
    data_creation: "unknown",
  }, {
    id: 2,
    login: "paulo1001234",
    nom: "paulo",
    prenom: "camala",
    telephone: "unknown",
    email: "paulo@orange-sonatel.com",
    profile: "admin",
    etat: false,
    data_creation: "unknown",
  }];

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return { users: this.users };
  }

  get(reqInfo: RequestInfo) {
    if (is(reqInfo, 'me/menu')) {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;
        const menu = JSON.parse(this.fetch('assets/data/menu.json?_t=' + Date.now())).menu;

        return { status: STATUS.OK, headers, url, body: { menu } };
      });
    }

    // if (is(reqInfo, 'me')) {
    //   return reqInfo.utils.createResponse$(() => {
    //     const { headers, url } = reqInfo;
    //     const req = reqInfo.req as HttpRequest<any>;
    //     const authorization = req.headers.get('Authorization');
    //     const [, token] = authorization.split(' ');
    //     const currentUser = Object.assign({}, this.users.find(user => generateToken(user) === token));
    //     delete currentUser.password;

    //     if (!currentUser || !currentUser.id) {
    //       return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
    //     }

    //     return { status: STATUS.OK, headers, url, body: currentUser };
    //   });
    // }

    if (is(reqInfo, 'sanctum/csrf-cookie')) {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;

        return { status: STATUS.NO_CONTENT, headers, url, body: {} };
      });
    }
  }

  // post(reqInfo: RequestInfo) {
  //   if (is(reqInfo, 'auth/login')) {
  //     return this.login(reqInfo);
  //   }

  //   if (is(reqInfo, 'auth/logout')) {
  //     return this.logout(reqInfo);
  //   }
  // }

  // private login(reqInfo: RequestInfo) {
  //   return reqInfo.utils.createResponse$(() => {
  //     const { headers, url } = reqInfo;
  //     const req = reqInfo.req as HttpRequest<any>;
  //     const { email, password } = req.body;
  //     const currentUser = this.users.find(user => user.email === email || user.nom === email);
  //     console.log("Info email : "+currentUser.email)
  //     console.log("Info name : "+currentUser.nom)
  //     console.log("Info id : "+currentUser.id)
  //     if (!currentUser) {
  //       return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
  //     }

  //     if (currentUser.password !== password) {
  //       return {
  //         status: STATUS.UNPROCESSABLE_ENTRY,
  //         headers,
  //         url,
  //         error: {
  //           errors: {
  //             password: ['The provided password is incorrect.'],
  //           },
  //         },
  //       };
  //     }

  //     return {
  //       status: STATUS.OK,
  //       headers,
  //       url,
  //       body: {
  //         access_token: generateToken(currentUser),
  //         token_type: 'bearer',
  //         expires_in: 3600,
  //       },
  //     };
  //   });
  // }

  // private logout(reqInfo: RequestInfo) {
  //   return reqInfo.utils.createResponse$(() => {
  //     const { headers, url } = reqInfo;

  //     return { status: STATUS.OK, headers, url, body: {} };
  //   });
  // }

  private fetch(url: string) {
    let content: any = null;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = () => content = xhr.responseText;
    xhr.send();

    return content;
  }
}
