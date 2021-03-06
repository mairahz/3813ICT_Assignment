import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [  
                          {path: 'login', component: LoginComponent},
                          {path: '', component: GroupsComponent},
                          {path: 'channel/:group', component: ChannelComponent},
                          {path: 'chat/:group/:channel', component: ChatComponent},
                          {path: 'settings/:group', component: SettingsComponent},
                          {path: 'profile', component: ProfileComponent},
                          {path: 'user', component: UserComponent}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
