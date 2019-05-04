import Spinner from '@sb1/ffe-spinner-react';
import { arrayOf, bool, func, number, object } from 'prop-types';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import SuggestionItemRow from './SuggestionItemDownshift';

const SuggestionListDownshift = ({
    suggestions,
    getItemProps,
    highlightedIndex,
    selectedItem,
    renderSuggestion,
    renderNoMatches,
    isLoading,
    heightMax,
    itemSize,
}) => {
    return isLoading ? (
        <Spinner center={true} large={true} />
    ) : suggestions.length > 0 ? (
        // todo: autoheight
        // scrollbars?'
        <div className="ffe-base-selector__suggestion-container">
            <List
                // className="ffe-base-selector__suggestion-container"
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

                className="ffe-base-selector__suggestion-container-list"
                // role="listbox"
                // id={id}
            >
                {SuggestionItemRow}
            </List>
        </div>
    ) : (
        <li>{renderNoMatches()}</li>
    );
};

SuggestionListDownshift.propTypes = {
    suggestions: arrayOf(object).isRequired,
    highlightedIndex: number,
    renderSuggestion: func.isRequired,
    selectedItem: object,
    renderNoMatches: func,
    getItemProps: func.isRequired,
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
