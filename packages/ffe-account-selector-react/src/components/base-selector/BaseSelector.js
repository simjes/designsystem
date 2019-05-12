import { Label } from '@sb1/ffe-form-react';
import Downshift from 'downshift';
import { arrayOf, bool, func, object, string } from 'prop-types';
import React, { Component, createRef } from 'react';
import Input from '../../subcomponents/input-field';
import { SuggestionList } from '../../subcomponents/suggestion';
import { Locale } from '../../util/types';

class BaseSelector extends Component {
    scrollbars = createRef();

    onInputValueChange = inputValue => {
        const { onInputChange, value } = this.props;

        if (inputValue !== value) {
            onInputChange(inputValue);
        }
    };

    stateReducer = (state, changes) => {
        const {
            shouldHideSuggestionsOnReset,
            shouldHideSuggestionsOnSelect,
            shouldHideSuggestionsOnBlur,
            isMultiSelect,
        } = this.props;

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
                    highlightedIndex: isMultiSelect
                        ? state.highlightedIndex
                        : null,
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

    itemToString = item => {
        const { isMultiSelect } = this.props;
        if (isMultiSelect) return '';

        return item ? item.name : '';
    };

    scrollToHighlightedIndex = (node, menu) => {
        if (this.scrollbars.current && node) {
            const index = [...menu.childNodes].indexOf(node);
            const nodeHeight = node.clientHeight;

            this.scrollbars.current.scrollTop(index * nodeHeight - nodeHeight);
        }
    };

    render() {
        const {
            id,
            locale,
            label,
            onReset,
            onSuggestionSelect,
            suggestions,
            renderSuggestion,
            renderNoMatches,
            renderStatusbar,
            shouldShowSuggestionsOnFocus,
            shouldHideSuggestionsOnReset,
            value,
            readOnly,
            ariaInvalid,
            placeholder,
            isLoading,
        } = this.props;

        return (
            <Downshift
                onInputValueChange={this.onInputValueChange}
                inputId={id}
                menuId={'suggestion-list'}
                labelId={`${id}-label`}
                onSelect={onSuggestionSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                scrollIntoView={this.scrollToHighlightedIndex}
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
                                readOnly={readOnly}
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
                            <SuggestionList
                                ref={this.scrollbars}
                                isOpen={isOpen}
                                suggestions={suggestions}
                                highlightedIndex={highlightedIndex}
                                renderSuggestion={renderSuggestion}
                                renderNoMatches={renderNoMatches}
                                isLoading={isLoading}
                                getMenuProps={getMenuProps}
                                getItemProps={getItemProps}
                                renderStatusbar={() =>
                                    renderStatusbar(closeMenu)
                                }
                            />
                        </div>
                    </div>
                )}
            </Downshift>
        );
    }
}

BaseSelector.propTypes = {
    suggestions: arrayOf(object).isRequired,
    value: string.isRequired,
    onInputChange: func.isRequired,
    locale: Locale.isRequired,
    placeholder: string,
    ariaInvalid: bool,
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
