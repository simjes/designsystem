import { Checkbox } from '@sb1/ffe-form-react';
import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import { accountFilter } from '../../filter/filters';
import txt from '../../i18n/i18n';
import {
    AccountNoMatch,
    AccountSuggestionMulti,
} from '../../subcomponents/account';
import { SuggestionListStatusBar } from '../../subcomponents/suggestion';
import { Account, Locale } from '../../util/types';
import BaseSelector from '../base-selector';

const allAccountsElement = { id: 'all-accounts', accountNumber: '' };

const renderSelectAll = (allSelected, locale, onSelectAll) => (
    <div className="ffe-account-suggestion__account--multi ffe-account-suggestion__select-all">
        <Checkbox
            checked={allSelected}
            name="ffe-account-suggestion__select-all-label"
            inline={false}
            tabIndex={-1}
            disabled={false}
            onChange={onSelectAll}
        />
        <div className="ffe-account-suggestion__content-wrapper">
            <span className="ffe-account-suggestion__name ffe-link-text ffe-link-text--no-underline">
                {txt[locale].SELECT_ALL}
            </span>
        </div>
    </div>
);

class AccountSelectorMulti extends React.Component {
    filterSuggestions = value => {
        const { accounts, showSelectAllOption } = this.props;
        if (showSelectAllOption && !value) {
            return [
                allAccountsElement,
                ...accounts.filter(accountFilter(value)),
            ];
        }
        return accounts.filter(accountFilter(value));
    };

    onSuggestionSelect = suggestion => {
        const { onAccountSelected, selectedAccounts, accounts } = this.props;
        if (suggestion) {
            if (suggestion.id === allAccountsElement.id) {
                const allSelected = selectedAccounts.length === accounts.length;
                this.props.onSelectAll(!allSelected);
                return;
            }
            onAccountSelected(suggestion);
        }
    };

    renderSuggestion = account => {
        const { locale, selectedAccounts, accounts, onSelectAll } = this.props;
        const isSelected = selectedAccounts.filter(
            a => a.accountNumber === account.accountNumber,
        );
        if (account.id !== allAccountsElement.id) {
            return (
                <AccountSuggestionMulti
                    account={account}
                    locale={locale}
                    selected={isSelected.length > 0}
                />
            );
        }
        return renderSelectAll(
            selectedAccounts.length === accounts.length,
            locale,
            onSelectAll,
        );
    };

    renderNoMatches = () => (
        <AccountNoMatch
            value={this.props.noMatches}
            locale={this.props.locale}
        />
    );

    renderSuggestionDetails = closeMenuCallback => {
        let statusText;
        const { selectedAccounts, isLoading } = this.props;
        if (selectedAccounts.length === 0) {
            statusText = txt[this.props.locale].NO_ACCOUNTS_SELECTED;
        } else if (selectedAccounts.length === 1) {
            statusText = txt[this.props.locale].ONE_ACCOUNT_SELECTED;
        } else {
            statusText = `${selectedAccounts.length} ${
                txt[this.props.locale].MULTIPLE_ACCOUNTS_SELECTED
            }`;
        }

        return (
            !isLoading && (
                <SuggestionListStatusBar
                    renderSelectionStatus={() => statusText}
                    onDone={closeMenuCallback}
                    labelDoneButton={
                        txt[this.props.locale].DROPDOWN_MULTISELECT_DONE
                    }
                />
            )
        );
    };

    render() {
        const {
            label,
            id,
            locale,
            value,
            onReset,
            onChange,
            isLoading,
        } = this.props;
        return (
            <div className="ffe-account-selector">
                <BaseSelector
                    id={id}
                    label={label}
                    isLoading={isLoading}
                    suggestions={this.filterSuggestions(value)}
                    renderSuggestion={account => this.renderSuggestion(account)}
                    renderNoMatches={this.renderNoMatches}
                    onInputChange={onChange}
                    onSuggestionSelect={this.onSuggestionSelect}
                    onReset={onReset}
                    locale={locale}
                    value={value}
                    shouldHideSuggestionsOnSelect={false}
                    shouldHideSuggestionsOnBlur={false}
                    shouldHideSuggestionsOnReset={true}
                    isMultiSelect={true}
                    renderStatusbar={closeMenuCallback =>
                        this.renderSuggestionDetails(closeMenuCallback)
                    }
                />
            </div>
        );
    }
}

AccountSelectorMulti.propTypes = {
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
    id: string.isRequired,
    label: string.isRequired,
    isLoading: bool,
    /** 'nb', 'nn', or 'en' */
    locale: Locale.isRequired,
    /** Overrides default string for all locales. */
    noMatches: string,
    /* Called when pressing escape in the input field */
    onReset: func,
    /** Called on changes in the input field */
    onChange: func,
    /** Called when an account is clicked */
    onAccountSelected: func.isRequired,
    onSelectAll: func,
    /**
     * Array of objects:
     *  {
     *      accountNumber: string.isRequired,
     *      balance: number,
     *      currencyCode: string.
     *      name: string.isRequired,
     *  }
     */
    selectedAccounts: arrayOf(Account).isRequired,
    showSelectAllOption: bool,
    value: string,
};

AccountSelectorMulti.defaultProps = {
    value: '',
    showSelectAllOption: false,
    isLoading: false,
    onReset: () => {},
    onChange: () => {},
    onSelectAll: () => {},
};

export default AccountSelectorMulti;
