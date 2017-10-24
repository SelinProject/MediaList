import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


export class MediaService {
  private URL: string; //this url contains photos and detail of photos.

  constructor( @Inject(Http) private http: Http) {
    this.URL = 'https://jsonplaceholder.typicode.com/photos';
  }

  // Uses http.get() to load a single JSON file
  getMediaWithDetail() {
    let headers = new Headers({ 'Content-Type': 'application/json;' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.URL, options).map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body.success == false) {
      return body.errorMessage;
    }
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
