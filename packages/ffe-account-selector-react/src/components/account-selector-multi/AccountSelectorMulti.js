/* TODO: Needs an aria-role, but I'm not sure which is correct */
/* eslint jsx-a11y/no-static-element-interactions:0 */
import { Checkbox } from '@sb1/ffe-form-react';
import classNames from 'classnames';
import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import autoBind from 'react-auto-bind';
import { accountFilter } from '../../filter/filters';
import txt from '../../i18n/i18n';
import {
    AccountNoMatch,
    AccountSuggestionMulti,
} from '../../subcomponents/account';
import { SuggestionListStatusBar } from '../../subcomponents/suggestion';
import { Account, Locale } from '../../util/types';
import BaseSelectorDownshift from '../base-selector/BaseSelectorDownshift';

const allAccountsElement = { id: 'all-accounts', accountNumber: '' };

const renderSelectAll = (allSelected, locale) => (
    <div className="ffe-account-suggestion__account--multi ffe-account-suggestion__select-all">
        <Checkbox
            checked={allSelected}
            name="ffe-account-suggestion__select-all-label"
            inline={false}
            tabIndex={-1}
            disabled={true}
        />
        <div className="ffe-account-suggestion__content-wrapper">
            <span className="ffe-account-suggestion__name ffe-link-text ffe-link-text--no-underline">
                {txt[locale].SELECT_ALL}
            </span>
        </div>
    </div>
);

class AccountSelectorMulti extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            suggestionListHeight: 0,
        };
    }

    filterSuggestions(value) {
        const { accounts, showSelectAllOption } = this.props;
        if (showSelectAllOption && !value) {
            return [
                allAccountsElement,
                ...accounts.filter(accountFilter(value)),
            ];
        }
        return accounts.filter(accountFilter(value));
    }

    onSuggestionSelect(suggestion) {
        const { onAccountSelected, selectedAccounts, accounts } = this.props;
        if (suggestion) {
            if (suggestion.id === allAccountsElement.id) {
                const allSelected = selectedAccounts.length === accounts.length;
                this.props.onSelectAll(!allSelected);
                return;
            }
            onAccountSelected(suggestion);
        }
    }

    renderSuggestion(account) {
        const { locale, selectedAccounts, accounts } = this.props;
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
        );
    }

    renderSuggestionDetails(listHeight, closeMenuCallback) {
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
        const height = listHeight;
        return (
            !isLoading && (
                <SuggestionListStatusBar
                    renderSelectionStatus={() => statusText}
                    onDone={closeMenuCallback}
                    labelDoneButton={
                        txt[this.props.locale].DROPDOWN_MULTISELECT_DONE
                    }
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: height,
                    }}
                />
            )
        );
    }

    render() {
        const { noMatches, locale, value, id, className } = this.props;
        return (
            <div
                id={`${id}-container`}
                className={classNames('ffe-account-selector', className)}
            >
                <BaseSelectorDownshift
                    id={id}
                    suggestions={this.filterSuggestions(value)}
                    renderSuggestion={account => this.renderSuggestion(account)}
                    renderNoMatches={() => (
                        <AccountNoMatch value={noMatches} locale={locale} />
                    )}
                    onInputChange={() => {}} //- not used in multi selector - but maybe it should?
                    onSuggestionSelect={this.onSuggestionSelect}
                    // onReset={onReset} - not used, should it?
                    locale={locale}
                    value={value} //- not used, should it?
                    shouldHideSuggestionsOnSelect={false}
                    // shouldSelectHighlightedOnTab={false} - do not want at all
                    shouldHideSuggestionsOnBlur={false}
                    shouldHideSuggestionsOnReset={true}
                    isMultiSelect={true}
                    // suggestionDetails={this.renderSuggestionDetails()} // TODO: not used
                    // suggestionFilter={accountFilter} - not used
                    // onSelect={onAccountSelected} - not used

                    renderStatusbar={(closeMenuCallback) => this.renderSuggestionDetails(300, closeMenuCallback)}
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
    className: string,
    id: string.isRequired,
    isLoading: bool,
    /** 'nb', 'nn', or 'en' */
    locale: Locale.isRequired,
    /** Overrides default string for all locales. */
    noMatches: string,
    /** Called when an account is clicked */
    onAccountSelected: func.isRequired,
    onBlur: func.isRequired,
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
    selectedAccounts: arrayOf(Account),
    showSelectAllOption: bool,
    value: string,
};

AccountSelectorMulti.defaultProps = {
    onSelectAll: () => {},
    selectedAccounts: [],
    showSelectAllOption: false,
    isLoading: false,
    noMatches: '',
    value: '',
};

export default AccountSelectorMulti;
