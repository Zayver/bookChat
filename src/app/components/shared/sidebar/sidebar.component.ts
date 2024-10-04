import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NgIconComponent, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { lucideBookOpenCheck, lucideMoon, lucideSun } from '@ng-icons/lucide'
import { PAGE_THEME, ThemeService } from '@services/theme.service';

@Component({
  selector: 'BookChat-sidebar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [provideNgIconsConfig({size:'2rem'}),provideIcons({lucideBookOpenCheck, lucideMoon, lucideSun})]
})
export class SidebarComponent {
  constructor(private themeS: ThemeService){
    const platformId = inject(PLATFORM_ID)
    if(isPlatformBrowser(platformId)){
      this.setTheme()
    }
  }
  
  protected toggleTheme(){
    this.themeS.toggleTheme()
    this.setTheme()
  }

  protected setTheme(){
    if(this.themeS.getTheme() === 'dark'){
      document.body.classList.add('dark')
    }else{
      document.body.classList.remove('dark')
    }
  }

  protected get themeIcon(){
    return this.themeS.getTheme() === "dark" ? 'lucideMoon' : 'lucideSun'
  }
}
