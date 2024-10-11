import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Prompt } from '@model/prompt';
import { PromptRequest } from '@model/prompt-request';
import { Candidate, FragmentDistance } from '@model/prompt-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideMenu, lucideSendHorizontal } from '@ng-icons/lucide';
import { PromptService } from '@services/prompt.service';
import { MessageService } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'BookChat-prompt',
  standalone: true,
  imports: [
    InputTextModule, InputTextareaModule, ButtonModule, NgIcon, 
    ReactiveFormsModule, AutoFocus, AsyncPipe
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
  providers: [provideIcons({ lucideAudioLines, lucideSendHorizontal, lucideMenu})]
})
export class PromptComponent implements OnInit {
  loading = signal(false)

  promptForm: FormGroup

  prompts$!: Observable< Prompt[]>
  candidates = output<Candidate>()
  showCandidatesBar = output()

  constructor(private promptService: PromptService, private messageS: MessageService) {
    const fb = inject(FormBuilder)
    this.promptForm = fb.group({
      generateAudio: ["0"],
      message: ['', [Validators.required, this.sanitizeInputArea]]
    })
  }

  ngOnInit(): void {
    this.prompts$ = this.promptService.getPrompts()
  }

  get audioStatus() {
    const audio = this.promptForm.get("generateAudio") as FormControl
    return audio.value === "1" ? 'primary' : 'secondary'
  }

  setAudioFlag() {
    const audio = this.promptForm.get("generateAudio") as FormControl
    if(audio.value === "1"){
      audio.setValue("0")
    }else{
      audio.setValue("1")
    }
  }

  sendPrompt() {
    this.loading.set(true)
    const request = this.promptForm.value as PromptRequest
    this.promptService.sendPrompt(request)
      .pipe(
        tap(res => this.promptService.addToCache({input: request, output: res})),
        finalize(() => {
          this.loading.set(false)
        })
      )
      .subscribe({
        next: (v) => {
          this.promptForm.get("message")?.reset()
          this.candidates.emit(v.fragment_distance)
          this.promptForm.get("generateAudio")?.setValue("0")
        },
        error:(err: HttpErrorResponse)=>{
          this.messageS.add({
            severity: 'error',
            summary: `Hubo un error al enviar la petición: ${err.status}`
          })
        }
      })
  }

  selectMessage(candidates: Candidate){
    this.candidates.emit(candidates)
  }

  checkEnter(event: KeyboardEvent){
    if(event.key === "Enter" && !event.shiftKey && this.promptForm.valid){
      event.preventDefault()
      this.sendPrompt()
    }
  }
  showCandidatesBarOnClick(){
    this.showCandidatesBar.emit()
  }

  sanitizeInputArea(control: any): { [key: string]: boolean } | null {
    const value = control.value || '';
    if (value.trim().length === 0) {
      return { onlyNewLines: true };
    }
    return null;
  }
}
