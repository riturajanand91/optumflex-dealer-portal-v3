import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpService } from 'src/app/services/http.service';


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
  public subscriptionForm: FormGroup;
  public dematAccountOptions = [
    { value: '1', viewValue: 'Angel' },
    { value: '2', viewValue: 'Zerodha' },
    { value: '3', viewValue: 'SMC Global' }
  ];

  public subsData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private httpService: HttpService,
    private toastify: ToastifyService,
    private logger: LoggerService
  ) {
    this.subscriptionForm = this.fb.group({
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
    });
  }

  ngOnInit(): void {
    this.getSubscriptions('53');
  }

  public getSubscriptions(id: any): void {
    this.httpService.getSubscription(id).subscribe(
      (data) => {
        console.log(data);
        this.logger.info('Subscription fetched successfully:', data);
        this.subsData = data?.transaction_data;
        // this.subsData = data;
        // Update form fields
        this.subscriptionForm.patchValue({
          subscriptionPackage: this.subsData.subscription_package,
          currentInvestment: this.subsData.total_investment,
          maxOrders: this.subsData.max_order_limit,
          perOrderCost: this.subsData.per_order_cost,
          addInvestment: this.subsData.add_investment,
          stocks: this.subsData.stocks_trade,
          index: this.subsData.index_trade,
          activeManualOrder: this.subsData.active_manual_orders,
          startVirtualAlgo: this.subsData.active_integration,
          startLiveAlgo: this.subsData.start_live_trading,
          dematAccount: this.subsData.brokerage_account.toString(), // Ensure the value is a string
          username: this.subsData.user_name,
          loginPin: this.subsData.user_password,
          apiKey: this.subsData.user_api_key,
          totp: this.subsData.user_totp
        });

      },
      (error) => {
        this.logger.error('Error fetching post:', error);
        this.toastify.showError('Failed to load post details');
      }
    );
  }


  onSubmit() {
    const formData = this.subscriptionForm.value;
    const brokerageAccount = Number(parseFloat(formData.dematAccount).toFixed(1));
    const apiData = {
      subscription_package: formData.subscriptionPackage,
      total_investment: formData.currentInvestment,
      max_order_limit: formData.maxOrders,
      per_order_cost: formData.perOrderCost,
      add_investment: formData.addInvestment,
      stocks_trade: formData.stocks,
      index_trade: formData.index,
      active_manual_orders: formData.activeManualOrder,
      active_integration: formData.startVirtualAlgo,
      start_live_trading: formData.startLiveAlgo,
      brokerage_account: brokerageAccount,
      user_name: formData.username,
      user_password: formData.loginPin,
      user_api_key: formData.apiKey,
      user_totp: formData.totp
    };

    console.log(apiData);

    // this.httpService.updateSubscription(apiData).subscribe(
    //   res => {
    //     this.logger.info('Post created successfully', { message: res.message });
    //     // console.log(resthis.subsData.message);
    //     this.toastify.showSuccess(resthis.subsData.message);
    //     this.utilityService.navigateTo('/posts');
    //   },
    //   error => {
    //     this.logger.error('Error creating post', { error });
    //     console.error('Error fetching posts:', error);
    //     this.toastify.showError('Failed to load posts');
    //   }
    // );
  }

  // public formSubmission(data: any) {
  //   this.logger.info('Submitting form data to server');
  //   
  // }
}
