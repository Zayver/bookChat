import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { PromptComponent } from '../prompt/prompt.component';
import { CandidatesComponent } from '../candidates/candidates.component';
import { Candidates } from '@model/prompt-response';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'BookChat-chat-wrapper',
  standalone: true,
  imports: [FrameComponent, PromptComponent, CandidatesComponent, ToastModule],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss',
  providers:[MessageService]
})
export class ChatWrapper {
  candidates = signal<Candidates[]>([])

  @ViewChild('candidatesBar', {read: ElementRef})
  private candidatesBar!: ElementRef

  constructor() {}

  setCandidates(candidates: Candidates[]){
    this.candidates.set(candidates)
  }

  toggleCandidates(){
    this.candidatesBar.nativeElement.classList.toggle('-translate-x-full')
  }
}
