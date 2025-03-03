import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-combined',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    NavigationComponent
  ],
  templateUrl: './combined.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class CombinedComponent implements OnInit {
  @Input() showTopNavigation = true;

  ngOnInit(): void {}
}