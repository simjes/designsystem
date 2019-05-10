import Downshift from 'downshift';
import { arrayOf, bool, func, object, string } from 'prop-types';
import React from 'react';
import Input from '../../subcomponents/input-field';
import { SuggestionListContainer } from '../../subcomponents/suggestion';
import { Locale } from '../../util/types';
import { Label } from '@sb1/ffe-form-react';

const BaseSelector = ({
    id,
    locale,
    label,
    onReset,
    onSuggestionSelect,
    onInputChange,
    suggestions,
    renderSuggestion,
    renderNoMatches,
    renderStatusbar,
    shouldShowSuggestionsOnFocus,
    shouldHideSuggestionsOnReset,
    shouldHideSuggestionsOnSelect,
    shouldHideSuggestionsOnBlur,
    value,
    readOnly,
    ariaInvalid,
    isMultiSelect,
    placeholder,
    isLoading,
}) => {
    const onInputValueChange = inputValue => {
        if (inputValue !== value) {
            onInputChange(inputValue);
        }
    };

    const stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownEscape:
                return {
                    ...changes,
                    isOpen: !shouldHideSuggestionsOnReset,
                };

            case Downshift.stateChangeTypes.clickItem:
            case Downshift.stateChangeTypes.keyDownEnter:
                return {
                    ...changes,
                    isOpen: !shouldHideSuggestionsOnSelect,
                };

            case Downshift.stateChangeTypes.blurInput:
            case Downshift.stateChangeTypes.blurButton:
            case Downshift.stateChangeTypes.mouseUp:
                return {
                    ...changes,
                    isOpen: !shouldHideSuggestionsOnBlur,
                };

            default:
                return changes;
        }
    };

    const itemToString = item => {
        if (isMultiSelect) return '';

        return item ? item.name : '';
    };

    return (
        <Downshift
            onInputValueChange={onInputValueChange}
            inputId={id}
            menuId={'suggestion-list'}
            labelId={`${id}-label`}
            onSelect={onSuggestionSelect}
            itemToString={itemToString}
            stateReducer={stateReducer}
        >
            {({
                getInputProps,
                getToggleButtonProps,
                getItemProps,
                getMenuProps,
                getLabelProps,
                isOpen,
                openMenu,
                closeMenu,
                clearSelection,
                highlightedIndex,
            }) => (
                <div className="ffe-base-selector">
                    <Label {...getLabelProps()}>{label}</Label>
                    <div className="ffe-input-group">
                        <Input
                            readOnly={readOnly || isMultiSelect}
                            ariaInvalid={ariaInvalid}
                            openMenu={openMenu}
                            shouldShowSuggestionsOnFocus={
                                shouldShowSuggestionsOnFocus
                            }
                            shouldHideSuggestionsOnReset={
                                shouldHideSuggestionsOnReset
                            }
                            clearSelection={clearSelection}
                            onReset={onReset}
                            value={value}
                            locale={locale}
                            getInputProps={getInputProps}
                            getToggleButtonProps={getToggleButtonProps}
                            placeholder={placeholder}
                        />
                        <SuggestionListContainer
                            isOpen={isOpen}
                            suggestions={suggestions}
                            highlightedIndex={highlightedIndex}
                            renderSuggestion={renderSuggestion}
                            renderNoMatches={renderNoMatches}
                            isLoading={isLoading}
                            getMenuProps={getMenuProps}
                            getItemProps={getItemProps}
                        />

                        {isOpen && renderStatusbar(closeMenu)}
                    </div>
                </div>
            )}
        </Downshift>
    );
};

BaseSelector.propTypes = {
    suggestions: arrayOf(object).isRequired,
    value: string.isRequired,
    onInputChange: func.isRequired,
    locale: Locale.isRequired,
    placeholder: string,
    ariaInvalid: bool, // TODO: can I use aria-invalid?
    id: string.isRequired,
    label: string.isRequired,
    readOnly: bool,
    isMultiSelect: bool,
    isLoading: bool,

    onReset: func,
    onSuggestionSelect: func.isRequired,

    renderSuggestion: func.isRequired,
    renderNoMatches: func.isRequired,
    renderStatusbar: func,

    shouldShowSuggestionsOnFocus: bool,
    shouldHideSuggestionsOnReset: bool,
    shouldHideSuggestionsOnSelect: bool,
    shouldHideSuggestionsOnBlur: bool,
    // shouldSelectHighlightedOnTab: bool.isRequired, // TODO: dårlig accessibility å allowe dette`?
};

BaseSelector.defaultProps = {
    onReset: () => {},
    renderStatusbar: () => {},
    readOnly: false,
    ariaInvalid: false,
    isMultiSelect: false,
    isLoading: false,
    placeholder: '',
    shouldShowSuggestionsOnFocus: true,
    shouldHideSuggestionsOnReset: true,
    shouldHideSuggestionsOnSelect: true,
    shouldHideSuggestionsOnBlur: true,
};

export default BaseSelector;
