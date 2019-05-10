/* TODO: Needs an aria-role, but I'm not sure which is correct */
/* eslint jsx-a11y/no-static-element-interactions:0 */
import { bool, number } from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SuggestionList from './SuggestionList';

const SuggestionListContainer = ({
    heightMax,
    autoHeight,
    isOpen,
    ...props
}) => {
    // const handleScroll = ({ target }) => {
    //     const { scrollTop } = target;

    //     listRef.current.scrollTo(scrollTop);
    // };

    // TODO: scroll when nav outside window

    return (
        <div
            className="ffe-base-selector__suggestion-container"
            style={{
                display: isOpen ? 'block' : 'none',
            }}
        >
            <Scrollbars
                autoHeight={autoHeight}
                autoHeightMax={heightMax}
                // onScroll={handleScroll}
            >
                <SuggestionList {...props} />
            </Scrollbars>
        </div>
    );
};

SuggestionListContainer.propTypes = {
    isOpen: bool.isRequired,
    heightMax: number,
    autoHeight: bool,
};

SuggestionListContainer.defaultProps = {
    heightMax: 300,
    autoHeight: true,
};

export default SuggestionListContainer;
