# Accounts

Types:

- <code><a href="./src/resources/accounts/accounts.ts">AccountConfiguration</a></code>

Methods:

- <code title="get /accounts/{account_token}">client.accounts.<a href="./src/resources/accounts/accounts.ts">retrieve</a>(accountToken) -> AccountConfiguration</code>
- <code title="patch /accounts/{account_token}">client.accounts.<a href="./src/resources/accounts/accounts.ts">update</a>(accountToken, { ...params }) -> AccountConfiguration</code>

## CreditConfiguration

Types:

- <code><a href="./src/resources/accounts/credit-configuration.ts">BusinessAccount</a></code>

Methods:

- <code title="get /accounts/{account_token}/credit_configuration">client.accounts.creditConfiguration.<a href="./src/resources/accounts/credit-configuration.ts">retrieve</a>(accountToken) -> BusinessAccount</code>
- <code title="patch /accounts/{account_token}/credit_configuration">client.accounts.creditConfiguration.<a href="./src/resources/accounts/credit-configuration.ts">update</a>(accountToken, { ...params }) -> BusinessAccount</code>

# Cards

Types:

- <code><a href="./src/resources/cards/cards.ts">Card</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardProvisionResponse</a></code>

Methods:

- <code title="post /cards">client.cards.<a href="./src/resources/cards/cards.ts">create</a>({ ...params }) -> Card</code>
- <code title="get /cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">retrieve</a>(cardToken) -> Card</code>
- <code title="patch /cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">update</a>(cardToken, { ...params }) -> Card</code>
- <code title="post /cards/{card_token}/provision">client.cards.<a href="./src/resources/cards/cards.ts">provision</a>(cardToken, { ...params }) -> CardProvisionResponse</code>

## FinancialTransactions

Types:

- <code><a href="./src/resources/cards/financial-transactions.ts">FinancialTransaction</a></code>

Methods:

- <code title="get /cards/{card_token}/financial_transactions/{financial_transaction_token}">client.cards.financialTransactions.<a href="./src/resources/cards/financial-transactions.ts">retrieve</a>(cardToken, financialTransactionToken) -> FinancialTransaction</code>

# Status

Types:

- <code><a href="./src/resources/status.ts">StatusListResponse</a></code>

Methods:

- <code title="get /status">client.status.<a href="./src/resources/status.ts">list</a>() -> StatusListResponse</code>
