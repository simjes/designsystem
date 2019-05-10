/* Because we are missing aria-controls (http://www.heydonworks.com/article/aria-controls-is-poop): */
/* eslint jsx-a11y/role-has-required-aria-props:0 */
import ChevronIkon from '@sb1/ffe-icons-react/lib/chevron-ikon';
import KryssIkon from '@sb1/ffe-icons-react/lib/kryss-ikon';
import classNames from 'classnames';
import { bool, func, string } from 'prop-types';
import React from 'react';
import txt from '../../i18n/i18n';
import { KeyCodes, Locale } from '../../util/types';

const Input = ({
    openMenu,
    shouldShowSuggestionsOnFocus,
    shouldHideSuggestionsOnReset,
    clearSelection,
    onReset,
    placeholder,
    readOnly,
    value,
    locale,
    getInputProps,
    getToggleButtonProps,
    ariaInvalid,
}) => {
    const showReset = !readOnly && value.length > 0;

    const onResetClick = () => {
        onReset();

        if (!shouldHideSuggestionsOnReset) {
            openMenu();
        }
    };

    return (
        <>
            <input
                {...getInputProps({
                    placeholder,
                    onKeyDown: event => {
                        if (event.keyCode === KeyCodes.ESC) {
                            onReset();
                        }
                    },
                    onClick: shouldShowSuggestionsOnFocus ? openMenu : null,
                    onFocus: shouldShowSuggestionsOnFocus ? openMenu : null,
                })}
                readOnly={readOnly}
                className="ffe-input-field ffe-base-selector__input-field"
                aria-invalid={ariaInvalid}
            />
            {showReset && (
                <button
                    className="ffe-base-selector__reset-button"
                    onClick={() => clearSelection(onResetClick)}
                    type="button"
                    aria-label={txt[locale].RESET_SEARCH}
                >
                    <KryssIkon className="ffe-base-selector__reset-button-icon" />
                </button>
            )}
            <button
                className="ffe-base-selector__expand-button"
                {...getToggleButtonProps({
                    onKeyDown: event => {
                        if (event.keyCode === KeyCodes.ESC) {
                            onReset();
                        }
                    },
                })}
            >
                <ChevronIkon
                    className={classNames(
                        'ffe-base-selector__expand-button-icon ',
                        {
                            'ffe-base-selector__expand-button-icon--invalid': ariaInvalid,
                        },
                    )}
                />
            </button>
        </>
    );
};

Input.propTypes = {
    readOnly: bool,
    ariaInvalid: bool, // TODO: can I do aria-invalid?
    placeholder: string,
    onReset: func.isRequired,
    value: string.isRequired,
    openMenu: func.isRequired,
    locale: Locale.isRequired,
    getInputProps: func.isRequired,
    clearSelection: func.isRequired,
    getToggleButtonProps: func.isRequired,
    shouldShowSuggestionsOnFocus: bool.isRequired,
    shouldHideSuggestionsOnReset: bool.isRequired,
};

Input.defaultProps = {
    placeholder: '',
    readOnly: false,
    ariaInvalid: false,
};

export default Input;
