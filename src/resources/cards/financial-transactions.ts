// File generated from our OpenAPI spec by Stainless.

import * as Core from 'meorphis-test-2/core';
import { APIResource } from 'meorphis-test-2/resource';
import * as FinancialTransactionsAPI from 'meorphis-test-2/resources/cards/financial-transactions';

export class FinancialTransactions extends APIResource {
  /**
   * Get the card financial transaction for the provided token.
   */
  retrieve(
    cardToken: string,
    financialTransactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialTransaction> {
    return this._client.get(
      `/cards/${cardToken}/financial_transactions/${financialTransactionToken}`,
      options,
    );
  }
}

export interface FinancialTransaction {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Status types:
   *
   * - `CARD` - Issuing card transaction.
   * - `ACH` - Transaction over ACH.
   * - `TRANSFER` - Internal transfer of funds between financial accounts in your
   *   program.
   */
  category: 'CARD' | 'ACH' | 'TRANSFER';

  /**
   * Date and time when the financial transaction first occurred. UTC time zone.
   */
  created: string;

  /**
   * 3-digit alphabetic ISO 4217 code for the settling currency of the transaction.
   */
  currency: string;

  /**
   * A string that provides a description of the financial transaction; may be useful
   * to display to users.
   */
  descriptor: string;

  /**
   * A list of all financial events that have modified this financial transaction.
   */
  events: Array<FinancialTransaction.Event>;

  /**
   * Pending amount of the transaction in the currency's smallest unit (e.g., cents),
   * including any acquirer fees. The value of this field will go to zero over time
   * once the financial transaction is settled.
   */
  pending_amount: number;

  /**
   * APPROVED transactions were successful while DECLINED transactions were declined
   * by user, Acme, or the network.
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the transaction that has been settled in the currency's smallest unit
   * (e.g., cents), including any acquirer fees. This may change over time.
   */
  settled_amount: number;

  /**
   * Status types:
   *
   * - `DECLINED` - The card transaction was declined.
   * - `EXPIRED` - Acme reversed the card authorization as it has passed its
   *   expiration time.
   * - `PENDING` - Authorization is pending completion from the merchant or pending
   *   release from ACH hold period
   * - `SETTLED` - The financial transaction is completed.
   * - `VOIDED` - The merchant has voided the previously pending card authorization.
   */
  status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED';

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated: string;
}

export namespace FinancialTransaction {
  export interface Event {
    /**
     * Globally unique identifier.
     */
    token?: string;

    /**
     * Amount of the financial event that has been settled in the currency's smallest
     * unit (e.g., cents).
     */
    amount?: number;

    /**
     * Date and time when the financial event occurred. UTC time zone.
     */
    created?: string;

    /**
     * APPROVED financial events were successful while DECLINED financial events were
     * declined by user, Acme, or the network.
     */
    result?: 'APPROVED' | 'DECLINED';

    /**
     * Event types:
     *
     * - `ACH_INSUFFICIENT_FUNDS` - Attempted ACH origination declined due to
     *   insufficient balance.
     * - `ACH_ORIGINATION_PENDING` - ACH origination pending release from an ACH hold.
     * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
     *   available balance.
     * - `ACH_RECEIPT_PENDING` - ACH receipt pending release from an ACH holder.
     * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
     *   balance.
     * - `ACH_RETURN` - ACH origination returned by the Receiving Depository Financial
     *   Institution.
     * - `AUTHORIZATION` - Authorize a card transaction.
     * - `AUTHORIZATION_ADVICE` - Advice on a card transaction.
     * - `AUTHORIZATION_EXPIRY` - Card Authorization has expired and reversed by Acme.
     * - `AUTHORIZATION_REVERSAL` - Card Authorization was reversed by the merchant.
     * - `BALANCE_INQUIRY` - A card balance inquiry (typically a $0 authorization) has
     *   occurred on a card.
     * - `CLEARING` - Card Transaction is settled.
     * - `CORRECTION_DEBIT` - Manual card transaction correction (Debit).
     * - `CORRECTION_CREDIT` - Manual card transaction correction (Credit).
     * - `CREDIT_AUTHORIZATION` - A refund or credit card authorization from a
     *   merchant.
     * - `CREDIT_AUTHORIZATION_ADVICE` - A credit card authorization was approved on
     *   your behalf by the network.
     * - `FINANCIAL_AUTHORIZATION` - A request from a merchant to debit card funds
     *   without additional clearing.
     * - `FINANCIAL_CREDIT_AUTHORIZATION` - A request from a merchant to refund or
     *   credit card funds without additional clearing.
     * - `RETURN` - A card refund has been processed on the transaction.
     * - `RETURN_REVERSAL` - A card refund has been reversed (e.g., when a merchant
     *   reverses an incorrect refund).
     * - `TRANSFER` - Successful internal transfer of funds between financial accounts.
     * - `TRANSFER_INSUFFICIENT_FUNDS` - Declined internl transfer of funds due to
     *   insufficient balance of the sender.
     */
    type?:
      | 'ACH_INSUFFICIENT_FUNDS'
      | 'ACH_ORIGINATION_PENDING'
      | 'ACH_ORIGINATION_RELEASED'
      | 'ACH_RECEIPT_PENDING'
      | 'ACH_RECEIPT_RELEASED'
      | 'ACH_RETURN'
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'CLEARING'
      | 'CORRECTION_DEBIT'
      | 'CORRECTION_CREDIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'TRANSFER'
      | 'TRANSFER_INSUFFICIENT_FUNDS';
  }
}

export namespace FinancialTransactions {
  export import FinancialTransaction = FinancialTransactionsAPI.FinancialTransaction;
}
