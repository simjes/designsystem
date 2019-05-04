import ChevronIkon from '@sb1/ffe-icons-react/lib/chevron-ikon';
import KryssIkon from '@sb1/ffe-icons-react/lib/kryss-ikon';
import classNames from 'classnames';
import { bool, func, string } from 'prop-types';
import React from 'react';
import txt from '../../i18n/i18n';
import { Locale, KeyCodes } from '../../util/types';

const InputFieldDownshift = ({
    isOpen,
    openMenu,
    shouldShowSuggestionsOnFocus,
    clearSelection,
    onReset,
    placeholder,
    readOnly,
    selectedItem,
    locale,
    getInputProps,
    getToggleButtonProps,
    ariaInvalid,
}) => {
    const showReset = !readOnly && selectedItem;

    return (
        <>
            <input
                // id={id}
                // name={name}
                // readOnly={readOnly}
                {...getInputProps({
                    isOpen,
                    placeholder: placeholder,
                    onKeyDown: event => {
                        if (event.keyCode === KeyCodes.ESC) {
                            onReset();
                        }
                    },
                })}
                onFocus={shouldShowSuggestionsOnFocus ? openMenu : null}
                className="ffe-input-field ffe-base-selector__input-field"
                aria-invalid={ariaInvalid}
            />
            {showReset && (
                <button
                    className="ffe-base-selector__reset-button"
                    onClick={() => clearSelection(onReset)}
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

                        if (event.keyCode === KeyCodes.SPACE) {
                            console.log('wee');
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
    isOpen: bool.isRequired,
    placeholder: string,
    locale: Locale.isRequired,
    getToggleButtonProps: func.isRequired,
    getInputProps: func.isRequired,
    ariaInvalid: bool,
};

InputFieldDownshift.defaultProps = {
    placeholder: '',
    ariaInvalid: false,
};

export default InputFieldDownshift;
