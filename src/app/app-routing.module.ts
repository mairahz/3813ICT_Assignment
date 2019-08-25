import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [  
                          {path: '', component: LoginComponent},
                          {path: 'group', component: GroupsComponent},
                          {path: 'channel', component: ChannelComponent},
                          {path: 'chat', component: ChatComponent}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
