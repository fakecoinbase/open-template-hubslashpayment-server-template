import { GooglePayment } from './googlePayment';
import { PaymentMethod } from '../../models/paymentMethod';
import { StripePayment } from './stripePayment';
import { CoinbasePayment } from './coinbasePayment';

export enum PaymentMethodEnum {
 Stripe = 'stripe',
 Coinbase = 'coinbase',
 Google = 'google'
}


export class PaymentWrapper implements PaymentMethod {

 constructor(paymentMethod) {
  switch (paymentMethod) {
   case PaymentMethodEnum.Google:
    this.paymentMethod = new GooglePayment();
    break;
   case PaymentMethodEnum.Stripe:
    this.paymentMethod = new StripePayment();
    break;
   case PaymentMethodEnum.Coinbase:
    this.paymentMethod = new CoinbasePayment();
    break;
   default:
    this.paymentMethod = undefined;
  }
 }

 paymentMethod: PaymentMethod | undefined;

 init = async (dbConn, paymentConfig, product, quantity) => {
  if (this.paymentMethod === undefined) return null;
  return await this.paymentMethod.init(dbConn, paymentConfig, product, quantity);
 }

 build = async (paymentConfig, external_transaction_id) => {
  if (this.paymentMethod === undefined) return null;
  return await this.paymentMethod.build(paymentConfig, external_transaction_id);
 }

 getTransactionHistory = async (dbConn, paymentConfig, username, external_transaction_id) => {
  if (this.paymentMethod === undefined) return null;
  return await this.paymentMethod.getTransactionHistory(dbConn, paymentConfig, username, external_transaction_id);
 }
}