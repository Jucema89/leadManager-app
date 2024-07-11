import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [CommonModule, SidebarComponent, RouterModule ]
})
export class LayoutComponent implements OnInit {
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
    }
 
}
