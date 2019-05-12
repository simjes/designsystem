import Spinner from '@sb1/ffe-spinner-react';
import { arrayOf, bool, func, number, object } from 'prop-types';
import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SuggestionItem from './SuggestionItem';

const SuggestionList = forwardRef(
    (
        {
            isOpen,
            autoHeight,
            heightMax,
            suggestions,
            highlightedIndex,
            renderSuggestion,
            renderNoMatches,
            renderStatusbar,
            isLoading,
            getMenuProps,
            getItemProps,
        },
        ref,
    ) =>
        isLoading ? (
            <Spinner center={true} large={true} />
        ) : (
            <>
                <div
                    className="ffe-base-selector__suggestion-container"
                    style={{
                        display: isOpen ? 'block' : 'none',
                    }}
                >
                    <Scrollbars
                        ref={ref}
                        autoHeight={autoHeight}
                        autoHeightMax={heightMax}
                    >
                        <ul
                            {...getMenuProps()}
                            className="ffe-base-selector__suggestion-container-list"
                        >
                            {suggestions.length > 0 ? (
                                suggestions.map((item, index) => (
                                    <SuggestionItem
                                        key={index}
                                        item={item}
                                        isHighlighted={
                                            index === highlightedIndex
                                        }
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
                    </Scrollbars>
                    {renderStatusbar()}
                </div>
            </>
        ),
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

    isOpen: bool.isRequired,
    heightMax: number,
    autoHeight: bool,
};

SuggestionList.defaultProps = {
    renderNoMatches: () => {},
    renderStatusbar: () => {},
    isLoading: false,
    highlightedIndex: null,
    heightMax: 300,
    autoHeight: true,
};

export default SuggestionList;
