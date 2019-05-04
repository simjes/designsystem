import ChevronIkon from '@sb1/ffe-icons-react/lib/chevron-ikon';
import KryssIkon from '@sb1/ffe-icons-react/lib/kryss-ikon';
import classNames from 'classnames';
import { bool, func, string } from 'prop-types';
import React from 'react';
import txt from '../../i18n/i18n';
import { KeyCodes, Locale } from '../../util/types';

const InputFieldDownshift = ({
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

InputFieldDownshift.propTypes = {
    placeholder: string,
    locale: Locale.isRequired,
    getToggleButtonProps: func.isRequired,
    getInputProps: func.isRequired,
    ariaInvalid: bool,
    value: string.isRequired,

    shouldShowSuggestionsOnFocus: bool.isRequired,
    shouldHideSuggestionsOnReset: bool.isRequired,
};

InputFieldDownshift.defaultProps = {
    placeholder: '',
    ariaInvalid: false,
};

export default InputFieldDownshift;
