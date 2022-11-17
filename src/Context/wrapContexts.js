import React from 'react'
import PageDesignState from './PageDesign/pageDesignState';
import UserDetailsState from './UserDetails/userDetailsState';
import DragElemsState from './DragElems/dragElemsState';
export default function wrapContexts(props) {
    return (
        <>
            <UserDetailsState>
                <PageDesignState>
                    <DragElemsState>
                        {props.children}
                    </DragElemsState>
                </PageDesignState>
            </UserDetailsState>
        </>
    )
}
