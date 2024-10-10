import { Component, input, output } from '@angular/core';
import { Candidate, FragmentDistance } from '@model/prompt-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleX } from '@ng-icons/lucide';
import { TransformBookNamePipe } from '@pipes/transform-book-name.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'BookChat-candidates',
  standalone: true,
  imports: [ButtonModule, NgIcon, TransformBookNamePipe],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
  providers: [provideIcons({lucideCircleX})]
})
export class CandidatesComponent {
  closeSideBar = output()
  candidates = input<Candidate>([])

  closeSideBarEmit(){
    this.closeSideBar.emit()
  }

  openLink(link: string){
    window.open(link, '_blank', 'noopener,noreferrer')
  }
}
