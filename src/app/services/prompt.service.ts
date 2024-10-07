import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PromptRequest } from '@model/prompt-request';
import { PromptResponse } from '@model/prompt-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(private http: HttpClient) {}

  sendPrompt(request: PromptRequest): Observable<PromptResponse>{
    return this.http.post<PromptResponse>(`${environment.apiUrl}/msg`, request)
  }
}
