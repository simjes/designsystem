import Spinner from '@sb1/ffe-spinner-react';
import { arrayOf, bool, func, number, object } from 'prop-types';
import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { VariableSizeList as List } from 'react-window';
import SuggestionItemRow from './SuggestionItemDownshift';

const SuggestionListDownshift = ({
    suggestions,
    isOpen,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    renderSuggestion,
    renderNoMatches,
    renderStatusbar,
    isLoading,
    heightMax,
    autoHeight,
    defaultItemSize,
}) => {
    const listRef = React.createRef();
    const totalItemsHeight = suggestions.reduce(
        (sum, suggestion) => sum + (suggestion.height || defaultItemSize),
        0,
    );

    const listHeight = Math.min(heightMax, totalItemsHeight);

    const handleScroll = ({ target }) => {
        const { scrollTop } = target;

        listRef.current.scrollTo(scrollTop);
    };

    return (
        <div
            className="ffe-base-selector__suggestion-container"
            style={{
                display: isOpen ? 'block' : 'none',
            }}
        >
            {isLoading ? (
                <Spinner center={true} large={true} />
            ) : suggestions.length > 0 ? (
                <Scrollbars
                    autoHeight={autoHeight}
                    autoHeightMax={heightMax}
                    onScroll={handleScroll}
                >
                    <List
                        ref={listRef}
                        innerElementType={forwardRef((props, ref) => (
                            <SuggestionList
                                {...props}
                                ref={ref}
                                getMenuProps={getMenuProps}
                            />
                        ))}
                        height={listHeight}
                        itemCount={suggestions.length}
                        itemSize={index =>
                            suggestions[index].height || defaultItemSize
                        }
                        itemData={{
                            suggestions,
                            getItemProps,
                            highlightedIndex,
                            renderSuggestion,
                        }}
                        style={{ overflow: false }}
                    >
                        {SuggestionItemRow}
                    </List>
                </Scrollbars>
            ) : (
                <SuggestionList getMenuProps={getMenuProps}>
                    <li>{renderNoMatches()}</li>
                </SuggestionList>
            )}
            {renderStatusbar()}
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
    defaultItemSize: number,

    getMenuProps: func.isRequired,
    getItemProps: func.isRequired,
    renderNoMatches: func,

    renderSuggestion: func.isRequired,
    renderStatusbar: func,
};

SuggestionListDownshift.defaultProps = {
    isLoading: false,
    heightMax: 300,
    autoHeight: true,
    defaultItemSize: 55,

    renderNoMatches: () => {},
    renderStatusbar: () => {},
};

export default SuggestionListDownshift;
