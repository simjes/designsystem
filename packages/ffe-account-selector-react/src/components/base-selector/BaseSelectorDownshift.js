import React from 'react';
import { func, bool, number, string, arrayOf, object } from 'prop-types';
import Downshift from 'downshift';
import { Locale } from '../../util/types';
import SuggestionListDownshift from '../../subcomponents/suggestion/SuggestionListDownshift';
import InputFieldDownshift from '../../subcomponents/input-field/InputFieldDownshift';

const BaseSelectorDownshift = ({
    id,
    locale,
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
    isMultiSelect,
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

    const itemToString = (item) => {
        if (isMultiSelect) return '';

        return item ? item.name : '';
    }

    return (
        <Downshift
            onInputValueChange={onInputValueChange}
            inputId={id}
            menuId={'suggestion-list'}
            onSelect={onSuggestionSelect}
            itemToString={itemToString}
            stateReducer={stateReducer}
        >
            {({
                getInputProps,
                getToggleButtonProps,
                getItemProps,
                getMenuProps,
                isOpen,
                openMenu,
                closeMenu,
                clearSelection,
                selectedItem,
                highlightedIndex,
            }) => (
                <div className="base-selector ffe-input-group">
                    <InputFieldDownshift
                        openMenu={openMenu}
                        shouldShowSuggestionsOnFocus={
                            shouldShowSuggestionsOnFocus
                        }
                        shouldHideSuggestionsOnReset={
                            shouldHideSuggestionsOnReset
                        }
                        clearSelection={clearSelection}
                        onReset={onReset}
                        readOnly={readOnly || isMultiSelect}
                        value={value}
                        locale={locale}
                        getInputProps={getInputProps}
                        getToggleButtonProps={getToggleButtonProps}
                    />
                    <SuggestionListDownshift
                        isOpen={isOpen}
                        suggestions={suggestions}
                        getItemProps={getItemProps}
                        getMenuProps={getMenuProps}
                        highlightedIndex={highlightedIndex}
                        selectedItem={selectedItem}
                        renderSuggestion={renderSuggestion}
                        renderNoMatches={renderNoMatches}
                    />
                    {isOpen && renderStatusbar(closeMenu)}
                </div>
            )}
        </Downshift>
    );
};

BaseSelectorDownshift.propTypes = {
    //is multiselect?
    suggestions: arrayOf(object).isRequired,
    onInputChange: func.isRequired,
    // onSelect: func.isRequired,
    locale: Locale.isRequired,
    // onSuggestionSelect: func.isRequired,
    onChange: func, // beholde for å ha likt api?
    // onBlur: func,
    // onClick: func,
    // onReset: func,
    // onFocus: func,
    // onSuggestionListChange: func, //provides the height of the suggestion list
    placeholder: string,
    // ariaInvalid: bool,
    suggestionsHeightMax: number,
    id: string,
    readOnly: bool,
    isMultiSelect: bool,

    onReset: func,

    value: string.isRequired, // shitty prop name

    // new required
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

BaseSelectorDownshift.defaultProps = {
    // onChange: () => {},
    // onBlur: () => {},
    // onClick: () => {},
    // onFocus: () => {},
    onReset: () => {},
    renderStatusbar: () => {},
    // onSuggestionListChange: () => {}, // brukt til height adjustmenet - ikke relevant
    readOnly: false,
    ariaInvalid: false,
    isMultiSelect: false,
    placeholder: '',
    shouldShowSuggestionsOnFocus: true,
    shouldHideSuggestionsOnReset: true,
    shouldHideSuggestionsOnSelect: true,
    shouldHideSuggestionsOnBlur: true,
};

export default BaseSelectorDownshift;
