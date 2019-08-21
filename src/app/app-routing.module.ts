import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GroupsComponent } from './groups/groups.component';


const routes: Routes = [
                          {path: '', component: GroupsComponent},
                          {path: 'chat', component: ChatComponent}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
