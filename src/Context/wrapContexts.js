import React from 'react'
import PageDesignState from './PageDesign/pageDesignState';
import UserDetailsState from './UserDetails/userDetailsState';
import DragElemsState from './DragElems/dragElemsState';
export default function wrapContexts(props) {
    return (
        <>
            <PageDesignState>
                <UserDetailsState>
                    <DragElemsState>
                        {props.children}
                    </DragElemsState>
                </UserDetailsState>
            </PageDesignState>
        </>
    )
}
