import React, { PropTypes } from 'react';
import { If } from 'nfe-if';
import amountFormatter from 'nfe-amount-formatter';
import accountFormatter from '../util/account-formatter';

const AccountRowSingle = ({account, locale}) => {
  const currencyCode = () => (account.currencyCode ? account.currencyCode : 'NOK');

  return (
    <div className="nfe-account-suggestions__account">
      <a className="nfe-account-suggestions__name">{ account.name }</a>
      <div className="nfe-account-suggestions__details">
        <span className="nfe-account-suggestions__account-number">
          { accountFormatter(account.accountNumber) }
        </span>
        <If condition={account.balance !== undefined}>
          <span className="nfe-account-suggestions__balance">
            { amountFormatter(account.balance, locale) } { currencyCode() }
          </span>
        </If>
      </div>
    </div>
  );
};

AccountRowSingle.propTypes = {
  account: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default AccountRowSingle;
