import Spinner from '@sb1/ffe-spinner-react';
import { arrayOf, bool, func, number, object } from 'prop-types';
import React, { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import SuggestionItemRow from './SuggestionItemDownshift';

const SuggestionListDownshift = ({
    suggestions,
    isOpen,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    renderSuggestion,
    renderNoMatches,
    isLoading,
    heightMax,
    itemSize,
}) => {
    return (
        <div
            className="ffe-base-selector__suggestion-container"
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            {isLoading ? (
                <Spinner center={true} large={true} />
            ) : suggestions.length > 0 ? (
                // todo: autoheight // scrollbars?'
                <List
                    innerElementType={forwardRef((props, ref) => (
                        <SuggestionList
                            {...props}
                            ref={ref}
                            getMenuProps={getMenuProps}
                        />
                    ))}
                    height={heightMax}
                    itemCount={suggestions.length}
                    itemSize={itemSize}
                    itemData={{
                        suggestions,
                        getItemProps,
                        highlightedIndex,
                        renderSuggestion,
                    }}
                >
                    {SuggestionItemRow}
                </List>
            ) : (
                <SuggestionList getMenuProps={getMenuProps}>
                    <li>{renderNoMatches()}</li>
                </SuggestionList>
            )}
        </div>
    );
};

const SuggestionList = ({ getMenuProps, ...rest }) => (
    <ul
        {...getMenuProps()}
        {...rest}
        className="ffe-base-selector__suggestion-container-list"
    />
);

SuggestionListDownshift.propTypes = {
    suggestions: arrayOf(object).isRequired,
    isOpen: bool.isRequired,
    highlightedIndex: number,
    selectedItem: object,
    isLoading: bool,
    heightMax: number,
    autoHeight: bool,
    itemSize: number,

    getMenuProps: func.isRequired,
    getItemProps: func.isRequired,
    renderNoMatches: func,

    renderSuggestion: func.isRequired,
};

SuggestionListDownshift.defaultProps = {
    isLoading: false,
    heightMax: 300,
    autoHeight: true,
    itemSize: 55,

    renderNoMatches: () => {},
};

export default SuggestionListDownshift;
