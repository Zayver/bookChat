import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Prompt } from '@model/prompt';
import { PromptRequest } from '@model/prompt-request';
import { FragmentDistance } from '@model/prompt-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideMenu, lucideSendHorizontal } from '@ng-icons/lucide';
import { PromptService } from '@services/prompt.service';
import { MessageService } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { finalize } from 'rxjs';

@Component({
  selector: 'BookChat-prompt',
  standalone: true,
  imports: [
    InputTextModule, InputTextareaModule, ButtonModule, NgIcon, 
    ReactiveFormsModule, AutoFocus
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
  providers: [provideIcons({ lucideAudioLines, lucideSendHorizontal, lucideMenu})]
})
export class PromptComponent {
  loading = signal(false)

  promptForm: FormGroup

  prompts: Prompt[] = []
  candidates = output<FragmentDistance[]>()
  showCandidatesBar = output()

  constructor(private prompS: PromptService, private messageS: MessageService) {
    const fb = inject(FormBuilder)
    this.promptForm = fb.group({
      audio: [false],
      message: ['', Validators.required]
    })
  }

  get audioStatus() {
    const audio = this.promptForm.get("audio") as FormControl
    return audio.value ? 'primary' : 'secondary'
  }

  setAudioFlag() {
    const audio = this.promptForm.get("audio") as FormControl
    audio.setValue(!audio.value)
  }

  sendPrompt() {
    this.loading.set(true)
    const request = this.promptForm.value as PromptRequest
    this.prompS.sendPrompt(request)
      .pipe(
        finalize(() => {
          this.loading.set(false)
        })
      )
      .subscribe({
        next: (v) => {
          this.promptForm.get("message")?.reset()
          this.prompts.unshift({ input: request, output: v })
          this.candidates.emit(v.fragment_distance)
        },
        error:(err: HttpErrorResponse)=>{
          this.messageS.add({
            severity: 'error',
            summary: `Hubo un error al enviar la petición: ${err.status}`
          })
        }
      })
  }

  selectMessage(candidates: FragmentDistance[]){
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
}
