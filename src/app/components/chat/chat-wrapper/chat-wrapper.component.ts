import { Component, signal } from '@angular/core';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { PromptComponent } from '../prompt/prompt.component';
import { CandidatesComponent } from '../candidates/candidates.component';
import { Candidates } from '@model/prompt-response';


@Component({
  selector: 'BookChat-chat-wrapper',
  standalone: true,
  imports: [FrameComponent, PromptComponent, CandidatesComponent],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss'
})
export class ChatWrapper {
  candidates = signal<Candidates[]>([])
  constructor() {
  }

  setCandidates(candidates: Candidates[]){
    this.candidates.set(candidates)
  }
}
