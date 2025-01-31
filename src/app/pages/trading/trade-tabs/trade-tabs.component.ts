import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
import { OrderBookComponent } from "../order-book/order-book.component";
import { TradeBookComponent } from "../trade-book/trade-book.component";
import { PositionComponent } from "../position/position.component";
import { HoldingComponent } from '../holding/holding.component';
@Component({
  selector: 'app-trade-tabs',
  standalone: true,
  imports: [MatTabsModule,
    CommonModule,
    MaterialModule,
    TablerIconsModule, OrderBookComponent, TradeBookComponent, PositionComponent,HoldingComponent],
  templateUrl: './trade-tabs.component.html',
  styleUrl: './trade-tabs.component.scss'
})
export class TradeTabsComponent {

}
