import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;
  form: FormGroup;
  public dematAccountOptions = [
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
  ) { }

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
        dematAccount: [''],
        username: [''],
        loginPin: [''],
        apiKey: [''],
        totp: ['']
      }
    );

  }

  onSubmit() {
    console.log(this.subscriptionForm.value);
  }
}
