/**
 * PatternFinder
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


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DefaultService {

    protected basePath = 'https://132.206.14.238:8000';
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
     * 
     * 
     * @param mass Name of the mass to retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMass(mass: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getMass(mass: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getMass(mass: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getMass(mass: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (mass === null || mass === undefined) {
            throw new Error('Required parameter mass was null or undefined when calling getMass.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.configuration.basePath}/mass/${encodeURIComponent(String(mass))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param mass Name of the mass to retrieve
     * @param noteIndices Indices of notes relative to the entire score which define the boundaries of this excerpt
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMassExcerpt(mass: string, noteIndices: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getMassExcerpt(mass: string, noteIndices: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getMassExcerpt(mass: string, noteIndices: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getMassExcerpt(mass: string, noteIndices: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (mass === null || mass === undefined) {
            throw new Error('Required parameter mass was null or undefined when calling getMassExcerpt.');
        }
        if (noteIndices === null || noteIndices === undefined) {
            throw new Error('Required parameter noteIndices was null or undefined when calling getMassExcerpt.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.configuration.basePath}/mass/${encodeURIComponent(String(mass))}/excerpt/${encodeURIComponent(String(noteIndices))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param inputType Indicates the music encoding language of the query string
     * @param krnText A music query string
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public search(inputType?: string, krnText?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public search(inputType?: string, krnText?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public search(inputType?: string, krnText?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public search(inputType?: string, krnText?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (inputType !== undefined && inputType !== null) {
            queryParameters = queryParameters.set('inputType', <any>inputType);
        }
        if (krnText !== undefined && krnText !== null) {
            queryParameters = queryParameters.set('krnText', <any>krnText);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.configuration.basePath}/search`,
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
