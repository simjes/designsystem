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
    selectedItem,
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
                        <Ul {...props} ref={ref} getMenuProps={getMenuProps} />
                    ))}
                    height={heightMax}
                    itemCount={suggestions.length}
                    itemSize={itemSize}
                    itemData={{
                        // forwardProps: props,
                        suggestions,
                        getItemProps,
                        highlightedIndex,
                        selectedItem,
                        renderSuggestion,
                    }}
                    // ref={props.refList}
                    //     style={{ overflow: false }}
                >
                    {SuggestionItemRow}
                </List>
            ) : (
                <Ul getMenuProps={getMenuProps}>
                    <li>{renderNoMatches()}</li>
                </Ul>
            )}
        </div>
    );
};

const Ul = ({ getMenuProps, ...rest }) => (
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
    renderSuggestion: func.isRequired,
    selectedItem: object,
    renderNoMatches: func,
    getItemProps: func.isRequired,
    getMenuProps: func.isRequired,
    isLoading: bool,
    refList: object,
    heightMax: number,
    autoHeight: bool,
    itemSize: number,
};

SuggestionListDownshift.defaultProps = {
    renderNoMatches: () => {},
    isLoading: false,
    itemSize: 55,
    heightMax: 300,
    autoHeight: true,
};

export default SuggestionListDownshift;
