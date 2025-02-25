export const environment = {
    production: false,
    baseUrl: 'http://www.optumflex.live:8000/fin/Dealer/End/User',
    endpoints: {
      verifyMail: '/verifyMail',
      dashboard: '/dashboard',
      users: '/auth',
      tradeData: '/Transactions',
      logger: '/utility/adminLogger',
      notification: '/notification'
    }
};