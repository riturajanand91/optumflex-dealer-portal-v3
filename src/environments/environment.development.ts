export const environment = {
  production: false,
  baseUrl: 'https://www.optumflex.live/fin/Dealer/End/User',
  fetchPublicIPUrl : 'https://api64.ipify.org?format=json',
  endpoints: {
    verifyMail: '/verifyMail',
    dashboard: '/dashboard',
    users: '/auth',
    tradeData: '/Transactions',
    subscriptions: '/Modify/Subscription',
    logger: '/utility/adminLogger',
    notification: '/notification'
  }
};
