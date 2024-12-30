import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const updatedRequest = req.clone({
    withCredentials: true,  
  });

  return next(updatedRequest);
};
