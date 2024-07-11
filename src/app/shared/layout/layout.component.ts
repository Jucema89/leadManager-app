import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ApiService } from '../../services/api/api.service';
import { User, UserCreate } from '../../interfaces/leads.interface';
import { LocalStorageService } from '../../services/localStorage/localstorage.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [CommonModule, SidebarComponent, RouterModule ]
})
export class LayoutComponent implements OnInit {
    user!: UserCreate
    constructor(
      private authService: AuthService,

    ){}


    isMobile: boolean = false
    menuArray = [
      { 
        id: 1,
        title: 'Dashboard', 
        link: '/dashboard'
      },
      { 
        id: 2,
        title: 'Leads', 
        link: '/leads'
      },
      { 
        id: 3,
        title: 'Users',
        link: '/user'
      },
      
    ]

    private breakpointObserver = inject(BreakpointObserver);

    ngOnInit(): void {
        this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });

      this.authService.getUser().then((user) => {
        if(typeof(user) !== 'string'){
          this.user = user
        }
      })

    }

    logout(){
      this.authService.logOut()
    }
 
}
