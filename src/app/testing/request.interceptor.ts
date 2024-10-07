import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { PromptRequest } from '@model/prompt-request';
import { PromptResponse } from '@model/prompt-response';
import { delay, of } from 'rxjs';


const audio = "https://dn720308.ca.archive.org/0/items/chrono-trigger-corridors-of-time-square-1995-snes/%C2%ABChrono%20Trigger%C2%BB%20-%20Corridors%20of%20Time%20%28Square%2C1995%2CSNES%29.mp3"
const response: PromptResponse = { 
  message: "Este es un mensaje de prueba el principal",
  audio: null,
  candidates: [
    {
      book: "Collected works of Poe",
      bookUrl: "https://manybooks.net/titles/poeedgaretext00poe1v10.html",
      message: "Esta es la primera opción"
    },{
      book: "El retrato de Dorian gray",
      bookUrl: "https://manybooks.net/titles/wildeosc10511051210512.html",
      message: "Esta es la segunda opción"
    },
    {
      book: "Alicia en el país de las maravillas",
      bookUrl: "https://manybooks.net/titles/carrolll1977819778-8.html",
      message: "Esta es la ultima opción debería haber 5 pero me dio pereza"
    }
  ]
}


export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  if(!isDevMode()){
    return next(req)
  }
  if (req.url.includes("/prompt")) {
    const body: PromptRequest = req.body as PromptRequest
    const res: PromptResponse =  JSON.parse(JSON.stringify(response));
    res.message += `: ${body.message}`
    if(body.audio){
      res.audio = audio
    }
    res.candidates[0].message+=`: ${body.message}`
    return of(new HttpResponse({status: 200, body: res})).pipe(delay(1000))
  }
  return next(req);
};
