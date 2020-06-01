import transactionHistoryModel from '../models/transactionHistoryModel';

export const createTransactionHistory = async (db, payment_config_key, username, product_id, external_transaction_id, transaction_history) => {
 try {
  await transactionHistoryModel(db.conn).create(
   {
    payment_config_key,
    username,
    product_id,
    external_transaction_id,
    payload: {transaction_history}
   }
  );
 } catch (e) {
  throw e;
 }
}

export const updateTransactionHistory = async (dbConn, paymentConfig, username, external_transaction_id, transaction_history) => {
 try {
  await transactionHistoryModel(dbConn).findOneAndUpdate(
   {payment_config_key: paymentConfig.key, username, external_transaction_id},
   {'payload.transaction_history': transaction_history}
  );
 } catch (e) {
  throw e;
 }
}