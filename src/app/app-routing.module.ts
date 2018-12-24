import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
	{ path: '', redirectTo: '/create', pathMatch: 'full' },
	{ path: 'create', component: CreateComponent },
	{ path: 'create/:id', component: CreateComponent },
	{ path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
