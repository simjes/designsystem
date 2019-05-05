import classNames from 'classnames';
import { array, func, number, object, shape } from 'prop-types';
import React from 'react';

const SuggestionItemRow = ({
    data: { suggestions, getItemProps, highlightedIndex, renderSuggestion },
    index,
    style,
}) => {
    const item = suggestions[index];
    const isHighlighted = highlightedIndex === index;

    return (
        <li
            {...getItemProps({
                style,
                item,
                index,
            })}
            id={`suggestion-item-${index}`}
            className={classNames('ffe-account-suggestion', {
                'ffe-account-suggestion--highlighted': isHighlighted,
            })}
        >
            {renderSuggestion(item)}
        </li>
    );
};

SuggestionItemRow.propTypes = {
    data: shape({
        suggestions: array.isRequired,
        getItemProps: func.isRequired,
        highlightedIndex: number,
        renderSuggestion: func.isRequired,
    }),
    index: number.isRequired,
    style: object.isRequired,
};

export default SuggestionItemRow;
