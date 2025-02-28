import { AuthService } from './../../../services/auth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
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
  public userIp: string;
  public subscriptionForm: FormGroup;
  public dematAccountOptions = [
    { value: '1', viewValue: 'Angel' },
    { value: '2', viewValue: 'Zerodha' },
    { value: '3', viewValue: 'SMC Global' }
  ];
  public userData: any = this.authService.getUser();
  public userId: any = this.userData.id;
  public subsData: any;

  constructor(
    private fb: FormBuilder,
    private UtilityService: UtilityService,
    private httpService: HttpService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private authService: AuthService,
  ) {
    this.subscriptionForm = this.fb.group({
      subscriptionPackage: [''],
      currentInvestment: [{ value: '', disabled: true }],
      maxOrders: [''],
      perOrderCost: [{ value: '', disabled: true }],
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
    // this.getPublicURL();
    this.getSubscriptions(53);
  }

  public getSubscriptions(id: any): void {
    this.logger.info('Fetching subscription with ID:', id);
    this.httpService.getSubscription({ id: this.userId }).subscribe(
      (data) => {
        this.logger.info('Subscription fetched successfully:', data);
        this.subsData = data?.transaction_data;
        this.subscriptionForm.patchValue({
          subscriptionPackage: this.subsData.subscription_package,
          currentInvestment: this.subsData.total_investment,
          maxOrders: this.subsData.max_order_limit,
          perOrderCost: this.subsData.per_order_cost,
          addInvestment: this.subsData.add_investment || 0,
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
        this.logger.info('Subscription form patched with fetched data');
      },
      (error) => {
        this.logger.error('Error fetching subscription:', error);
        this.toastify.showError('Failed to load subscription details');
      }
    );
  }

  public onSubmit() {
    this.logger.info('Submitting subscription form');
    const formData = this.subscriptionForm.value;
    const brokerageAccount = Number(parseFloat(formData.dematAccount).toFixed(1));
    const apiData = {
      ip_address: '',
      id: this.userId,
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
    this.logger.info('API data prepared for submission:', apiData);
    this.httpService.updateSubscription(apiData).subscribe(
      res => {
        this.logger.info('Subscription updated successfully', { message: res.msg });
        this.toastify.showSuccess(res.msg);
        this.ngOnInit();
      },
      error => {
        this.logger.error('Error updating subscription', { error });
        console.error('Error updating subscription:', error);
        this.toastify.showError('Failed to update subscription');
      }
    );
  }

  public getPublicURL() {
    this.UtilityService.getPublicIP().subscribe(
      (data) => {
        this.userIp = data.ip; // API response { ip: "your-public-ip" }
        this.logger.info('User Public IP:', this.userIp);
      },
      (error) => {
        this.logger.error('Error fetching IP:', error);
        this.toastify.showError('Failed to fetch public IP');
      }
    );
  }
}
