import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';

import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [MaterialModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;
  form: FormGroup;
  dematAccountOptions = [
    { value: '123456789', viewValue: 'Demat 1 (123456789)' },
    { value: '987654321', viewValue: 'Demat 2 (987654321)' },
    { value: '112233445', viewValue: 'Demat 3 (112233445)' },
    { value: '556677889', viewValue: 'Demat 4 (556677889)' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private utilityService: UtilityService
  ) {
    this.form = this.fb.group({
      accounts: this.fb.array([]) // FormArray for dynamic rows
    });

    // Add one row by default
    this.addAccount();
  }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group(
      {
        subscriptionPackage: [''],
        currentInvestment: [''],
        maxOrders: [''],
        perOrderCost: [''],
        addInvestment: [''],
        stocks: [''],
        index: [''],
        activeManualOrder: [''],
        startVirtualAlgo: [''],
        startLiveAlgo: [''],
      }
    );

  }
  get accounts() {
    return this.form.get('accounts') as FormArray;
  }

  addAccount() {
    const accountGroup = this.fb.group({
      dematAccount: [''],
      username: [''],
      loginPin: [''],
      apiKey: [''],
      totp: ['']
    });
    this.accounts.push(accountGroup);
  }

  removeAccount(index: number) {
    if (this.accounts.length > 1) {
      this.accounts.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
