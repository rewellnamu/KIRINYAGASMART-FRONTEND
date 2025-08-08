import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { NewsComponent } from './public/news/news.component';
import { ProjectsComponent } from './public/projects/projects.component';
import { TendersComponent } from './public/tenders/tenders.component';
import { ContactComponent } from './public/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { ManageProjectsComponent } from './admin/manage-projects/manage-projects.component';
import { ManageTendersComponent } from './admin/manage-tenders/manage-tenders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tenders', component: TendersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'manage-news', component: ManageNewsComponent, canActivate: [AuthGuard] },
{ path: 'manage-projects', component: ManageProjectsComponent, canActivate: [AuthGuard] },
{ path: 'manage-tenders', component: ManageTendersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
