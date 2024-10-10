import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { Prompt } from '@model/prompt';
import { PromptRequest } from '@model/prompt-request';
import { PromptResponse } from '@model/prompt-response';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts$: BehaviorSubject<Prompt[]> = new BehaviorSubject<Prompt[]>([])
  private readonly maxCacheSize = 15
  private readonly cacheKey = "prompt-cache"

  constructor(private http: HttpClient) {
    const platformId = inject(PLATFORM_ID)
    if(isPlatformBrowser(platformId)){
      const cache = localStorage.getItem(this.cacheKey)
      if(cache){
        this.prompts$.next(JSON.parse(cache))
      }
    }
  }

  getPrompts(): Observable<Prompt[]>{
    return this.prompts$.asObservable()
  }

  addToCache(prompt: Prompt){
    const cache = this.prompts$.getValue()

    cache.unshift(prompt)
    if(cache.length >= this.maxCacheSize){
      cache.pop()
    }

    this.prompts$.next(cache)
    this.syncToStorage(cache)
  }

  sendPrompt(request: PromptRequest): Observable<PromptResponse>{
    return this.http.post<PromptResponse>(`${environment.apiUrl}/msg`, request)
  }

  private syncToStorage(cache: Prompt[]){
    localStorage.setItem(this.cacheKey, JSON.stringify(cache));
  }
}
