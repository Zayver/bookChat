import { Component, input, output } from '@angular/core';
import { Candidates } from '@model/prompt-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleX } from '@ng-icons/lucide';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'BookChat-candidates',
  standalone: true,
  imports: [ButtonModule, NgIcon],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
  providers: [provideIcons({lucideCircleX})]
})
export class CandidatesComponent {
  closeSideBar = output()
  candidates = input<Candidates[]>([])

  closeSideBarEmit(){
    this.closeSideBar.emit()
  }

  openLink(link: string){
    window.open(link, '_blank', 'noopener,noreferrer')
  }
}
