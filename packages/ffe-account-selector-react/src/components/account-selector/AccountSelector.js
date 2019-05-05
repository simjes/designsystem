import classNames from 'classnames';
import { arrayOf, bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import autoBind from 'react-auto-bind';
import { createAccountFilter } from '../../filter/filters';
import {
    AccountDetails,
    AccountNoMatch,
    AccountSuggestion,
} from '../../subcomponents/account';
import { Account, Locale } from '../../util/types';
import BaseSelectorDownshift from '../base-selector/BaseSelectorDownshift';

class AccountSelector extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.enableFilter = false;
    }

    renderSuggestion(account) {
        return (
            <AccountSuggestion
                account={account}
                locale={this.props.locale}
                showBalance={this.props.showBalance}
            />
        );
    }

    renderNoMatches() {
        return (
            <AccountNoMatch
                value={this.props.noMatches}
                locale={this.props.locale}
            />
        );
    }

    onAccountSelect(account) {
        if (account) {
            this.enableFilter = false;
            this.props.onAccountSelected(account);
        }
    }

    onInputChange(value) {
        this.enableFilter = true;
        this.props.onChange(value);
    }

    filterSuggestions() {
        const { value, accounts } = this.props;
        const accountFilter = createAccountFilter(this.enableFilter);
        return accounts.filter(accountFilter(value));
    }

    render() {
        const {
            id,
            className,
            locale,
            selectedAccount,
            showBalance,
            onReset,
            value,
            readOnly,
            noMatches,
        } = this.props;
        return (
            <div
                id={`${id}-container`}
                className={classNames('ffe-account-selector', className)}
            >
                <BaseSelectorDownshift
                    // TODO: memoize?
                    id={id}
                    suggestions={this.filterSuggestions()}
                    renderSuggestion={this.renderSuggestion}
                    renderNoMatches={() => (
                        <AccountNoMatch value={noMatches} locale={locale} />
                    )}
                    onInputChange={this.onInputChange}
                    onSuggestionSelect={this.onAccountSelect}
                    onReset={onReset}
                    locale={locale}
                    value={value}
                    shouldHideSuggestionsOnSelect={true}
                    //shouldSelectHighlightedOnTab={true} // Todo: meh
                    shouldHideSuggestionsOnBlur={true}
                    shouldHideSuggestionsOnReset={false}
                    readOnly={readOnly}
                />
                {selectedAccount && (
                    <AccountDetails
                        account={selectedAccount}
                        locale={locale}
                        showBalance={showBalance}
                    />
                )}
            </div>
        );
    }
}

AccountSelector.propTypes = {
    /**
     * Array of objects:
     *  {
     *      accountNumber: string.isRequired,
     *      balance: number,
     *      currencyCode: string.
     *      name: string.isRequired,
     *  }
     */
    accounts: arrayOf(Account).isRequired,
    className: string,
    id: string.isRequired,
    /** 'nb', 'nn', or 'en' */
    locale: Locale.isRequired,
    /** Overrides default string for all locales. */
    noMatches: string,
    /** Called when an account is clicked (or Enter is pressed when highlighted) */
    onAccountSelected: func.isRequired,
    /** Called on changes in the input field */
    onChange: func.isRequired,
    selectedAccount: Account,
    /* Called when pressing escape in the input field */
    onReset: func,
    /** Default true. */
    showBalance: bool,
    value: string.isRequired,
    /**
     * Disables the input-field. Useful when shown in native apps,
     * where the textual input and keyboard can be distracting.
     */
    readOnly: bool,
};

AccountSelector.defaultProps = {
    className: '',
    noMatches: '',
    selectAccount: null,
    showBalance: true,
    readOnly: false,
    onReset: () => {},
}

export default AccountSelector;
