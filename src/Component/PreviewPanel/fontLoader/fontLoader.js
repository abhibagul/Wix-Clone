import React, { useEffect } from 'react'
import GoogleFontLoader from 'react-google-font-loader';

export default function FontLoader(props) {

    useEffect(() => {
    }, [props.fontList])

    return (
        <>
            {(props.fontList.length > 0) && <GoogleFontLoader fonts={props.fontList} />}
        </>
    )
}
