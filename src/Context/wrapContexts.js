import React from 'react'
import PageDesignState from './PageDesign/pageDesignState';
import UserDetailsState from './UserDetails/userDetailsState';

export default function wrapContexts(props) {
    return (
        <>
            <PageDesignState>
                <UserDetailsState>
                    {props.children}
                </UserDetailsState>
            </PageDesignState>
        </>
    )
}
