import Spinner from '@sb1/ffe-spinner-react';
import { arrayOf, bool, func, number, object } from 'prop-types';
import React from 'react';
import SuggestionItem from './SuggestionItem';

const SuggestionList = ({
    suggestions,
    highlightedIndex,
    renderSuggestion,
    renderNoMatches,
    renderStatusbar,
    isLoading,
    getMenuProps,
    getItemProps,
}) =>
    isLoading ? (
        <Spinner center={true} large={true} />
    ) : (
        <>
            <ul
                {...getMenuProps()}
                className="ffe-base-selector__suggestion-container-list"
            >
                {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                        <SuggestionItem
                            key={index}
                            item={item}
                            isHighlighted={index === highlightedIndex}
                            render={renderSuggestion}
                            getItemProps={getItemProps}
                            index={index}
                        />
                    ))
                ) : (
                    <li
                        {...getItemProps({
                            item: null,
                        })}
                    >
                        {renderNoMatches()}
                    </li>
                )}
            </ul>
            {renderStatusbar()}
        </>
    );

SuggestionList.propTypes = {
    suggestions: arrayOf(object).isRequired,
    highlightedIndex: number,
    renderSuggestion: func.isRequired,
    renderNoMatches: func,
    isLoading: bool,
    getMenuProps: func.isRequired,
    getItemProps: func.isRequired,
    renderStatusbar: func,
};

SuggestionList.defaultProps = {
    renderNoMatches: () => {},
    renderStatusbar: () => {},
    isLoading: false,
    highlightedIndex: undefined,
};

export default SuggestionList;
