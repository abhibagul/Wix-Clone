import React from 'react'
import PageDesignState from './PageDesign/pageDesignState';
import UserDetailsState from './UserDetails/userDetailsState';
import DragElemsState from './DragElems/dragElemsState';
import CssSheetPreviewState from './cssSheetPreview/cssSheetPreviewState';
export default function wrapContexts(props) {
    return (
        <>
            <CssSheetPreviewState>
                <UserDetailsState>
                    <PageDesignState>
                        <DragElemsState>
                            {props.children}
                        </DragElemsState>
                    </PageDesignState>
                </UserDetailsState>
            </CssSheetPreviewState>
        </>
    )
}
