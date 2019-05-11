Kontovelger med støtte for å velge flere kontoer på én gang.

```js
initialState = {
    selectedAccounts: [],
    value: '',
};

const accounts = [
    {
        accountNumber: '123456789101',
        name: 'Brukskonto',
        currencyCode: 'NOK',
        balance: 1337,
    },
    {
        accountNumber: '123456789102',
        name: 'Sparekonto',
        currencyCode: 'NOK',
        balance: 13337,
    },
];

<React.Fragment>
    <AccountSelectorMulti
        accounts={accounts}
        id="account-selector-multi"
        label="Velg konto"
        locale="nb"
        onChange={inputValue => setState({ value: inputValue })}
        onSelectAll={() => {
            const { selectedAccounts } = state;

            const hasUnselectedAccounts =
                selectedAccounts.length < accounts.length;

            setState({
                selectedAccounts: hasUnselectedAccounts ? accounts : [],
            });
        }}
        showSelectAllOption={true}
        onAccountSelected={acc => {
            const { selectedAccounts } = state;

            const filteredAccounts = selectedAccounts.filter(
                a => a.accountNumber !== acc.accountNumber,
            );

            const accountAlreadySelectedAndShouldBeRemoved =
                filteredAccounts.length !== selectedAccounts.length;

            if (accountAlreadySelectedAndShouldBeRemoved) {
                setState({
                    selectedAccounts: filteredAccounts,
                });
            } else {
                setState({
                    selectedAccounts: [...selectedAccounts, acc],
                });
            }
        }}
        selectedAccounts={state.selectedAccounts}
        value={state.value}
    />
</React.Fragment>;
```
