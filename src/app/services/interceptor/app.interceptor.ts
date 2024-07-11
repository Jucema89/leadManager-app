import { inject } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { JsonObject, ResultObject } from "./app.interceptor.interface";
import { NotificationService } from "../notification/notification.service";


export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const apiBaseUrl = `${environment.apiBaseUrl}`
    const notification = inject(NotificationService)
    
    if(req.url.includes('/assets/')){
        return next(req)
    }

    const token = localStorage.getItem('token') || ''

    let request = req.clone({
        url: `${apiBaseUrl}/api${req.url}`,
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    });

    return next(request).pipe(
        catchError((error) => {
            return handleError(error, notification)
        })
    )
}

function handleError(httpError: HttpErrorResponse, notification: NotificationService) {
    //error connect with backend
    notification.open({
        title: 'Error en request to server',
        message: `${httpError.message}`,
        clase: 'alert'
    })

    const response = new HttpResponse({ body: { success: false }})
    return of( response )
}



function transformObjectToArray(obj: JsonObject): ResultObject[] {
    return Object.keys(obj).map(key => {
        const { type, value, msg, path, location } = obj[key];
        return { type, value, msg, path, location, key };
    });
}
