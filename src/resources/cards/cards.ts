// File generated from our OpenAPI spec by Stainless.

import * as Core from 'meorphis-test-2/core';
import { APIResource } from 'meorphis-test-2/resource';
import * as CardsAPI from 'meorphis-test-2/resources/cards/cards';
import * as FinancialTransactionsAPI from 'meorphis-test-2/resources/cards/financial-transactions';

export class Cards extends APIResource {
  financialTransactions: FinancialTransactionsAPI.FinancialTransactions =
    new FinancialTransactionsAPI.FinancialTransactions(this._client);

  /**
   * Create a new virtual or physical card. Parameters `pin`, `shipping_address`, and
   * `product_id` only apply to physical cards.
   */
  create(params: CardCreateParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/cards', {
      body,
      ...options,
      headers: { 'Idempotency-Key': idempotencyKey || '', ...options?.headers },
    });
  }

  /**
   * Get card configuration such as spend limit and state.
   */
  retrieve(cardToken: string, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.get(`/cards/${cardToken}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain
   * unchanged. `pin` parameter only applies to physical cards.
   *
   * _Note: setting a card to a `CLOSED` state is a final action that cannot be
   * undone._
   */
  update(cardToken: string, body: CardUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.patch(`/cards/${cardToken}`, { body, ...options });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital
   * wallet (e.g. Apple Pay) with one touch from your app.
   *
   * This requires some additional setup and configuration. Please
   * [Contact Us](https://acme.com/contact) or your Customer Success representative
   * for more information.
   */
  provision(
    cardToken: string,
    params: CardProvisionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CardProvisionResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(`/cards/${cardToken}/provision`, {
      body,
      ...options,
      headers: { 'Idempotency-Key': idempotencyKey || '', ...options?.headers },
    });
  }
}

export interface Card {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * An RFC 3339 timestamp for when the card was created. UTC time zone.
   */
  created: string;

  funding: Card.Funding;

  /**
   * Last four digits of the card number.
   */
  last_four: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined.
   */
  spend_limit: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Card state values:
   *
   * - `CLOSED` - Card will no longer approve authorizations. Closing a card cannot
   *   be undone.
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   * - `PENDING_FULFILLMENT` - The initial state for cards of type `PHYSICAL`. The
   *   card is provisioned pending manufacturing and fulfillment. Cards in this state
   *   can accept authorizations for e-commerce purchases, but not for "Card Present"
   *   purchases where the physical card itself is present.
   * - `PENDING_ACTIVATION` - Each business day at 2pm Eastern Time Zone (ET), cards
   *   of type `PHYSICAL` in state `PENDING_FULFILLMENT` are sent to the card
   *   production warehouse and updated to state `PENDING_ACTIVATION` . Similar to
   *   `PENDING_FULFILLMENT`, cards in this state can be used for e-commerce
   *   transactions. API clients should update the card's state to `OPEN` only after
   *   the cardholder confirms receipt of the card.
   *
   * In sandbox, the same daily batch fulfillment occurs, but no cards are actually
   * manufactured.
   */
  state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

  /**
   * Card types:
   *
   * - `VIRTUAL` - Card will authorize at any merchant and can be added to a digital
   *   wallet like Apple Pay or Google Pay (if the card program is digital
   *   wallet-enabled).
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [acme.com/contact](https://acme.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card is closed upon first successful authorization.
   * - `MERCHANT_LOCKED` - _[Deprecated]_ Card is locked to the first merchant that
   *   successfully authorizes the card.
   */
  type: 'VIRTUAL' | 'PHYSICAL' | 'MERCHANT_LOCKED' | 'SINGLE_USE';

  /**
   * List of identifiers for the Auth Rule(s) that are applied on the card.
   */
  auth_rule_tokens?: Array<string>;

  /**
   * Three digit cvv printed on the back of the card.
   */
  cvv?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Acme to use. See
   * [Flexible Card Art Guide](https://docs.acme.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Two digit (MM) expiry month.
   */
  exp_month?: string;

  /**
   * Four digit (yyyy) expiry year.
   */
  exp_year?: string;

  /**
   * Hostname of card’s locked merchant (will be empty if not applicable).
   */
  hostname?: string;

  /**
   * Friendly name to identify the card. We recommend against using this field to
   * store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI
   * compliant to have PAN returned as a field in production. Please contact
   * [support@acme.com](mailto:support@acme.com) for questions.
   */
  pan?: string;
}

export namespace Card {
  export interface Funding {
    /**
     * A globally unique identifier for this FundingAccount.
     */
    token: string;

    /**
     * An RFC 3339 string representing when this funding source was added to the Acme
     * account. This may be `null`. UTC time zone.
     */
    created: string;

    /**
     * The last 4 digits of the account (e.g. bank account, debit card) associated with
     * this FundingAccount. This may be null.
     */
    last_four: string;

    /**
     * State of funding source.
     *
     * Funding source states:
     *
     * - `ENABLED` - The funding account is available to use for card creation and
     *   transactions.
     * - `PENDING` - The funding account is still being verified e.g. bank
     *   micro-deposits verification.
     * - `DELETED` - The founding account has been deleted.
     */
    state: 'ENABLED' | 'PENDING' | 'DELETED';

    /**
     * Types of funding source:
     *
     * - `DEPOSITORY_CHECKING` - Bank checking account.
     * - `DEPOSITORY_SAVINGS` - Bank savings account.
     */
    type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS';

    /**
     * Account name identifying the funding source. This may be `null`.
     */
    account_name?: string;

    /**
     * The nickname given to the `FundingAccount` or `null` if it has no nickname.
     */
    nickname?: string;
  }
}

export interface CardProvisionResponse {
  provisioning_payload?: string;
}

export interface CardCreateParams {
  /**
   * Body param: Card types:
   *
   * - `VIRTUAL` - Card will authorize at any merchant and can be added to a digital
   *   wallet like Apple Pay or Google Pay (if the card program is digital
   *   wallet-enabled).
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [acme.com/contact](https://acme.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card is closed upon first successful authorization.
   * - `MERCHANT_LOCKED` - _[Deprecated]_ Card is locked to the first merchant that
   *   successfully authorizes the card.
   */
  type: 'VIRTUAL' | 'PHYSICAL' | 'MERCHANT_LOCKED' | 'SINGLE_USE';

  /**
   * Body param: Globally unique identifier for the account that the card will be
   * associated with. Required for programs enrolling users using the
   * [/account_holders endpoint](https://docs.acme.com/docs/account-holders-kyc). See
   * [Managing Your Program](doc:managing-your-program) for more information.
   */
  account_token?: string;

  /**
   * Body param: For card programs with more than one BIN range. This must be
   * configured with Acme before use. Identifies the card program/BIN range under
   * which to create the card. If omitted, will utilize the program's default
   * `card_program_token`. In Sandbox, use 00000000-0000-0000-1000-000000000000 and
   * 00000000-0000-0000-2000-000000000000 to test creating cards on specific card
   * programs.
   */
  card_program_token?: string;

  /**
   * Body param:
   */
  carrier?: CardCreateParams.Carrier;

  /**
   * Body param: Specifies the digital card art to be displayed in the user’s digital
   * wallet after tokenization. This artwork must be approved by Mastercard and
   * configured by Acme to use. See
   * [Flexible Card Art Guide](https://docs.acme.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Body param: Two digit (MM) expiry month. If neither `exp_month` nor `exp_year`
   * is provided, an expiration date will be generated.
   */
  exp_month?: string;

  /**
   * Body param: Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year`
   * is provided, an expiration date will be generated.
   */
  exp_year?: string;

  /**
   * Body param: Friendly name to identify the card. We recommend against using this
   * field to store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Body param: Encrypted PIN block (in base64). Only applies to cards of type
   * `PHYSICAL` and `VIRTUAL`. See
   * [Encrypted PIN Block](https://docs.acme.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Body param: Only applicable to cards of type `PHYSICAL`. This must be configured
   * with Acme before use. Specifies the configuration (i.e., physical card art) that
   * the card should be manufactured with.
   */
  product_id?: string;

  /**
   * Body param:
   */
  shipping_address?: CardCreateParams.ShippingAddress;

  /**
   * Body param: Shipping method for the card. Only applies to cards of type
   * PHYSICAL. Use of options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx Express, 3-day shipping, with tracking
   * - `2_DAY` - FedEx 2-day shipping, with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: 'STANDARD' | 'STANDARD_WITH_TRACKING' | 'PRIORITY' | 'EXPRESS' | '2_DAY' | 'EXPEDITED';

  /**
   * Body param: Amount (in cents) to limit approved authorizations. Transaction
   * requests above the spend limit will be declined. Note that a spend limit of 0 is
   * effectively no limit, and should only be used to reset or remove a prior limit.
   * Only a limit of 1 or above will result in declined transactions due to checks
   * against the card limit.
   */
  spend_limit?: number;

  /**
   * Body param: Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Body param: Card state values:
   *
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   */
  state?: 'OPEN' | 'PAUSED';

  /**
   * Header param: Idempotency key for the POST request. See
   * [Idempotency Requests](https://docs.acme.com/docs/idempotent-requests) for
   * details on behavior such as cache duration.
   */
  'Idempotency-Key'?: string;
}

export namespace CardCreateParams {
  export interface Carrier {
    /**
     * QR code url to display on the card carrier
     */
    qr_code_url?: string;
  }

  export interface ShippingAddress {
    /**
     * Valid USPS routable address.
     */
    address1: string;

    /**
     * City
     */
    city: string;

    /**
     * Uppercase ISO 3166-1 alpha-3 three character abbreviation.
     */
    country: string;

    /**
     * Customer's first name. This will be the first name printed on the physical card.
     */
    first_name: string;

    /**
     * Customer's surname (family name). This will be the last name printed on the
     * physical card.
     */
    last_name: string;

    /**
     * Postal code (formerly zipcode). For US addresses, either five-digit zipcode or
     * nine-digit "ZIP+4".
     */
    postal_code: string;

    /**
     * Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a
     * limit of 24 characters for other countries.
     */
    state: string;

    /**
     * Unit number (if applicable).
     */
    address2?: string;

    /**
     * Email address to be contacted for expedited shipping process purposes. Required
     * if `shipping_method` is `EXPEDITED`.
     */
    email?: string;

    /**
     * Text to be printed on line two of the physical card. Use of this field requires
     * additional permissions.
     */
    line2_text?: string;

    /**
     * Cardholder's phone number in E.164 format to be contacted for expedited shipping
     * process purposes. Required if `shipping_method` is `EXPEDITED`.
     */
    phone_number?: string;
  }
}

export interface CardUpdateParams {
  /**
   * Identifier for any Auth Rules that will be applied to transactions taking place
   * with the card.
   */
  auth_rule_token?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Acme to use. See
   * [Flexible Card Art Guide](https://docs.acme.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Friendly name to identify the card. We recommend against using this field to
   * store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` and
   * `VIRTUAL`. See
   * [Encrypted PIN Block](https://docs.acme.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined. Note that a spend limit of 0 is effectively no
   * limit, and should only be used to reset or remove a prior limit. Only a limit of
   * 1 or above will result in declined transactions due to checks against the card
   * limit.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Card state values:
   *
   * - `CLOSED` - Card will no longer approve authorizations. Closing a card cannot
   *   be undone.
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   */
  state?: 'CLOSED' | 'OPEN' | 'PAUSED';
}

export interface CardProvisionParams {
  /**
   * Body param: Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive
   * only `activationData` in the response. Apple's public leaf certificate. Base64
   * encoded in PEM format with headers `(-----BEGIN CERTIFICATE-----)` and trailers
   * omitted. Provided by the device's wallet.
   */
  certificate?: string;

  /**
   * Body param: Name of digital wallet provider.
   */
  digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY';

  /**
   * Body param: Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive
   * only `activationData` in the response. Base64 cryptographic nonce provided by
   * the device's wallet.
   */
  nonce?: string;

  /**
   * Body param: Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive
   * only `activationData` in the response. Base64 cryptographic nonce provided by
   * the device's wallet.
   */
  nonce_signature?: string;

  /**
   * Header param: Idempotency key for the POST request. See
   * [Idempotency Requests](https://docs.acme.com/docs/idempotent-requests) for
   * details on behavior such as cache duration.
   */
  'Idempotency-Key'?: string;
}

export namespace Cards {
  export import Card = CardsAPI.Card;
  export import CardProvisionResponse = CardsAPI.CardProvisionResponse;
  export import CardCreateParams = CardsAPI.CardCreateParams;
  export import CardUpdateParams = CardsAPI.CardUpdateParams;
  export import CardProvisionParams = CardsAPI.CardProvisionParams;
  export import FinancialTransactions = FinancialTransactionsAPI.FinancialTransactions;
  export import FinancialTransaction = FinancialTransactionsAPI.FinancialTransaction;
}
