import { Routes } from '@angular/router';
import { TrainingsDocsComponent } from './pages/trainings-docs/trainings-docs.component';
import { CreateTrainingDocsComponent } from './pages/create-training-docs/create-training-docs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/guards/AuthGuard/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
   
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsComponent),
            },
            {
                path: 'leads',
                loadChildren: () => import('./pages/leads/leasd.module').then(m => m.LeadsModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
