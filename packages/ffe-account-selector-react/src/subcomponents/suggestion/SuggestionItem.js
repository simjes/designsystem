import classNames from 'classnames';
import { bool, func, number, object } from 'prop-types';
import React from 'react';

const SuggestionItem = ({
    item,
    isHighlighted,
    render,
    getItemProps,
    index,
}) => (
    <li
        {...getItemProps({
            item,
            index,
        })}
        id={`suggestion-item-${index}`}
        className={classNames('ffe-account-suggestion', {
            'ffe-account-suggestion--highlighted': isHighlighted,
        })}
    >
        {render(item)}
    </li>
);

SuggestionItem.propTypes = {
    item: object.isRequired,
    isHighlighted: bool.isRequired,
    render: func.isRequired,
    getItemProps: func.isRequired,
    index: number.isRequired,
};

export default SuggestionItem;
