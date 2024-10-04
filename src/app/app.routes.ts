import { Routes } from '@angular/router';
import { FrameComponent } from './components/shared/frame/frame.component';

export const routes: Routes = [
    { 
        path: "", 
        loadComponent: () => import("@components/chat/chat-wrapper/chat-wrapper.component").then(m => m.ChatWrapper),
        title: "Chat"

    }
];
