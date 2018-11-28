/**
 * SMIR
 * Content-Based Music Retrieval
 *
 * OpenAPI spec version: 1.0.0
 * Contact: david.garfinkle@mail.mcgill.ca
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Occurrence } from '../model/occurrence';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DefaultService {

    protected basePath = 'http://132.206.14.238:8000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Request the excerpt, highlighted excerpt, or entirety of a piece in the database
     * 
     * @param piece The unique name of the piece document
     * @param n Indices of notes to highlight
     * @param c Colour of the highlighted notes
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPiece(piece: string, n?: Array<number>, c?: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public getPiece(piece: string, n?: Array<number>, c?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public getPiece(piece: string, n?: Array<number>, c?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public getPiece(piece: string, n?: Array<number>, c?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (piece === null || piece === undefined) {
            throw new Error('Required parameter piece was null or undefined when calling getPiece.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (n) {
            queryParameters = queryParameters.set('n', n.join(COLLECTION_FORMATS['csv']));
        }
        if (c !== undefined && c !== null) {
            queryParameters = queryParameters.set('c', <any>c);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/xml',
            'application/svg'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<string>(`${this.configuration.basePath}/piece/${piece}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
                responseType: 'text'
            }
        );
    }

    /**
     * Request the service to perform a content-based music retrieval search
     * 
     * @param encoding Indicates the music encoding language of the query string
     * @param query A music query string
     * @param minOccLength Filter results for minimum length
     * @param maxTargetWindow Filter results for a maximum sorted distance between highlighted notes
     * @param transposition An enum: what type of transpositions of the query will be returned
     * @param corpus Select a corpus to search through
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public search(encoding?: string, query?: string, minOccLength?: number, maxTargetWindow?: number, transposition?: number, corpus?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Occurrence>>;
    public search(encoding?: string, query?: string, minOccLength?: number, maxTargetWindow?: number, transposition?: number, corpus?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Occurrence>>>;
    public search(encoding?: string, query?: string, minOccLength?: number, maxTargetWindow?: number, transposition?: number, corpus?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Occurrence>>>;
    public search(encoding?: string, query?: string, minOccLength?: number, maxTargetWindow?: number, transposition?: number, corpus?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (encoding !== undefined && encoding !== null) {
            queryParameters = queryParameters.set('encoding', <any>encoding);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (minOccLength !== undefined && minOccLength !== null) {
            queryParameters = queryParameters.set('minOccLength', <any>minOccLength);
        }
        if (maxTargetWindow !== undefined && maxTargetWindow !== null) {
            queryParameters = queryParameters.set('maxTargetWindow', <any>maxTargetWindow);
        }
        if (transposition !== undefined && transposition !== null) {
            queryParameters = queryParameters.set('transposition', <any>transposition);
        }
        if (corpus !== undefined && corpus !== null) {
            queryParameters = queryParameters.set('corpus', <any>corpus);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/html',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Occurrence>>(`${this.configuration.basePath}/search`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
