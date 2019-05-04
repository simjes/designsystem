import React from 'react';
import { func, bool, number, string, arrayOf, object } from 'prop-types';
import Downshift from 'downshift';
import { Locale } from '../../util/types';
import SuggestionListDownshift from '../../subcomponents/suggestion/SuggestionListDownshift';
import InputFieldDownshift from '../../subcomponents/input-field/InputFieldDownshift';

const BaseSelectorDownshift = ({
    locale,
    onReset,
    onSelect,
    onInputChange,
    suggestions,
    renderSuggestion,
    renderNoMatches,
    shouldShowSuggestionsOnFocus,
    shouldHideSuggestionsOnReset,
    value, // need better naming
}) => {
    const onInputValueChange = inputValue => {
        if (inputValue !== value) {
            onInputChange(inputValue);
        }
    };

    return (
        <Downshift
            onInputValueChange={onInputValueChange}
            onSelect={onSelect}
            itemToString={item => (item ? item.name : '')}
        >
            {({
                getInputProps,
                getToggleButtonProps,
                getItemProps,
                isOpen,
                openMenu,
                clearSelection,
                selectedItem,
                highlightedIndex,
            }) => (
                <div className="base-selector ffe-input-group">
                    <InputFieldDownshift
                        isOpen={isOpen}
                        openMenu={openMenu}
                        shouldShowSuggestionsOnFocus={
                            shouldShowSuggestionsOnFocus
                        }
                        shouldHideSuggestionsOnReset={
                            shouldHideSuggestionsOnReset
                        }
                        clearSelection={clearSelection}
                        onReset={onReset}
                        readOnly={false}
                        value={selectedItem}
                        locale={locale}
                        getInputProps={getInputProps}
                        getToggleButtonProps={getToggleButtonProps}
                        selectedItem={selectedItem}
                    />
                    {isOpen && suggestions.length > 0 && (
                        <SuggestionListDownshift
                            suggestions={suggestions}
                            getItemProps={getItemProps}
                            highlightedIndex={highlightedIndex}
                            selectedItem={selectedItem}
                            renderSuggestion={renderSuggestion}
                            renderNoMatches={renderNoMatches}
                        />
                    )}
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
    // value: string.isRequired,
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
    name: string,
    readOnly: bool,

    // new required
    renderSuggestion: func.isRequired,
    renderNoMatches: func.isRequired,

    shouldHideSuggestionsOnReset: bool,
    shouldShowSuggestionsOnFocus: bool,
};

BaseSelectorDownshift.defaultProps = {
    // onChange: () => {},
    // onBlur: () => {},
    // onClick: () => {},
    // onFocus: () => {},
    // onReset: () => {},
    // onSuggestionListChange: () => {},
    ariaInvalid: false,
    placeholder: '',
    value: '',
    shouldHideSuggestionsOnReset: false,
    shouldShowSuggestionsOnFocus: true,
};

export default BaseSelectorDownshift;
