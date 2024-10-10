import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { PromptRequest } from '@model/prompt-request';
import { FragmentDistance, PromptResponse } from '@model/prompt-response';
import { delay, of } from 'rxjs';


const audio = "https://dn720308.ca.archive.org/0/items/chrono-trigger-corridors-of-time-square-1995-snes/%C2%ABChrono%20Trigger%C2%BB%20-%20Corridors%20of%20Time%20%28Square%2C1995%2CSNES%29.mp3"
const response: PromptResponse = { 
  text: "Este es un mensaje de prueba el principal",
  audio_url: null,
  fragment_distance: [
    ['TEXTO POR DEFECTO','Libro_prueba.pdf', 2, 0.0,'https://manybooks.net/titles/poeedgaretext00poe1v10.html'],
    ['TEXTO POR DEFECTO','Libro_prueba.pdf', 3, 0.0,'https://manybooks.net/titles/poeedgaretext00poe1v10.html'],
    ['TEXTO POR DEFECTO','Libro_prueba.pdf', 4, 0.0,'https://manybooks.net/titles/poeedgaretext00poe1v10.html']
  ]
}


export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  if(!isDevMode()){
    return next(req)
  }
  if (req.url.includes("/msg")) {
    const body: PromptRequest = req.body as PromptRequest
    console.log(body)
    const res: PromptResponse =  JSON.parse(JSON.stringify(response));
    res.text += `: ${body.message}`
    if(body.generateAudio){
      res.audio_url = audio
    }
    const frag = res.fragment_distance[0] as FragmentDistance
    frag[0]+=`: ${body.message}`

    if(body.message === "none"){
      res.fragment_distance = "None"
    }
    return of(new HttpResponse({status: 200, body: res}))
  }
  return next(req);
};
