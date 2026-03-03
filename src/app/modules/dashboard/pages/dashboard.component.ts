import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RouterLink} from '@angular/router';
import { Sidenav } from '../../shared/components/sidenav/sidenav';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, RouterLink, Sidenav],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}