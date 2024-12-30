import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith("http://") || !req.url.startsWith("https://")) {
    const updatedReq = req.clone({
      url: `${environment.backendAddress}${req.url}`
    });
    return next(updatedReq);
  }
  return next(req);
};
