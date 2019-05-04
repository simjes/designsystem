import classNames from 'classnames';
import { number, object } from 'prop-types';
import React from 'react';

const SuggestionItemRow = ({
    data: {
        suggestions,
        getItemProps,
        highlightedIndex,
        selectedItem,
        renderSuggestion,
    },
    index,
    style,
}) => {
    const item = suggestions[index];
    const isHighlighted = highlightedIndex === index;
    // const isSelected = selectedItem === item;

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
        // <SuggestionItemDownshift
        //     {...getItemProps({
        //         style,
        //         item,
        //         index,
        //         isActive: highlightedIndex === index,
        //         isSelected: selectedItem === item,
        //     })}
        //     // id={`suggestion-item-${index}`}
        // >
        //     {/* {renderSuggestion(item)} */}
        //     wtf
        // </SuggestionItemDownshift>
    );
};

SuggestionItemRow.propTypes = {
    // data: objectOf({
    //     suggestions: array.isRequired,
    //     renderSuggestion: func.isRequired,
    //     getItemProps: func.isRequired,
    //     highlightedIndex: number,
    //     selectedItem: object,
    // }),
    data: object,
    index: number.isRequired,
    style: object.isRequired,
};

// const SuggestionItemDownshift = ({
//     id,
//     children,
//     isActive,
//     ...props
//     //isSelected?
// }) => {
//     //tabindex -1 handled by downshift?
//     return (
//         <li
//             {...props}
//             id={id}
//             className={classNames('ffe-account-suggestion', {
//                 'ffe-account-suggestion--highlighted': isActive,
//             })}
//         >
//             {children}
//         </li>
//     );
// };

// SuggestionItemDownshift.propTypes = {
//     id: string.isRequired,
//     isActive: bool.isRequired,
//     children: node.isRequired,
// };

export default SuggestionItemRow;
// export { SuggestionItemDownshift };
