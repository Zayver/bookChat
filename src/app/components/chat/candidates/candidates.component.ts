import { Component, input } from '@angular/core';
import { Candidates } from '@model/prompt-response';

@Component({
  selector: 'BookChat-candidates',
  standalone: true,
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
  candidates = input<Candidates[]>([])
}
