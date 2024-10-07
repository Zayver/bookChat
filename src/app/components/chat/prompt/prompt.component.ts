import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Prompt } from '@model/prompt';
import { PromptRequest } from '@model/prompt-request';
import { Candidates, PromptResponse } from '@model/prompt-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideSendHorizontal } from '@ng-icons/lucide';
import { PromptService } from '@services/prompt.service';
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
  providers: [provideIcons({ lucideAudioLines, lucideSendHorizontal })]
})
export class PromptComponent {
  loading = signal(false)

  promptForm: FormGroup

  promptResponse = output<PromptResponse>()

  prompts: Prompt[] = []
  candidates = output<Candidates[]>()

  constructor(private prompS: PromptService) {
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
          this.candidates.emit(v.candidates)
        }
      })
  }

  selectMessage(candidates: Candidates[]){
    this.candidates.emit(candidates)
  }

  checkEnter(event: KeyboardEvent){
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault()
      this.sendPrompt()
    }
  }
  checkInput(event: InputEvent){

  }
}
