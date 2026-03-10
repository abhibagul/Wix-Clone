import React, { useState, useEffect, useRef, useContext } from 'react'
import { useUser } from '../auth/useUser';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import FontLoader from '../PreviewPanel/fontLoader/fontLoader';
import SetStyle from '../previewPage/setStyle';
import { cssSheetPreview } from '../../Context/contexts';

import '../previewPage/previewPage.css'
export default function WebPage() {

    const __webpageParams = useParams();

    const pageStyle = useRef([`html,body{border: 0;padding: 0;margin: 0;outline: 0;}`]);
    const scrollPosition = useRef(0);
    let cssSheetPreviewState = useContext(cssSheetPreview)

    const [prevPage, setPrevPage] = useState({
        loaded: false,
        page: {},
        authorized: false
    });



    useEffect(() => {
        getCurrentScollPosition();

        bindScrollingListners();
    }, [prevPage])

    useEffect(() => {

        getPagePrev();

        bindScrollingListners();

        document.querySelector('.webPagePrev').addEventListener('scroll', getCurrentScollPosition);

        return () => {
            window.removeEventListener('scroll', getCurrentScollPosition);
        }


    }, []);



    const getPagePrev = async () => {
        try {

            await axios.post('/api/PublishPage/', {
                pageUri: __webpageParams.pageUri,
                websiteId: __webpageParams.websiteId
            }, {

            }).then(response => {
                // 
                if (response.data.result) {

                    setPrevPage({ ...prevPage, page: response.data.result, authorized: true, loaded: true })
                    // pageDesignState.setDesign(response.data.result)
                    // pageDesignState.setWebDesignState(response.data.webResult)
                } else {
                    // navigate("/my-websites")
                    setPrevPage({ ...prevPage, authorized: false, loaded: true })
                }


            }).catch(err => {
                // navigate("/my-websites")
                setPrevPage({ ...prevPage, authorized: false, loaded: true })
            })

        } catch (e) {

            setPrevPage({ ...prevPage, authorized: false, loaded: true })
        }
    }

    const MultiHTMLComp = (props) => {

        // //////
        return (
            <>
                {
                    props.e.map((el, i) => {
                        let htmlCon = "";
                        if (el.hasOwnProperty("inHTML")) htmlCon = el.inHTML;
                        return (<GenerateHTMLComp element={el} datapath={props.datapath + i + ','} key={i} >{htmlCon}</GenerateHTMLComp>)
                    })
                }
            </>
        )
    }

    const getClassNames = (e, __clsName) => {



        if (typeof e == 'string') {
            return e + " " + __clsName;
        }

        if (typeof e == 'object') {
            return [...e, __clsName].join(" ");
        }
        return e;
    }

    const styleToString = (style) => {
        return Object.keys(style).reduce((acc, key) => (
            acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
        ), '');
    };

    const GenerateHTMLComp = (props) => {

        let e = props.element;
        let formatStyle = { ...e.styles };
        //create class
        let __dp = props.datapath;
        __dp = __dp.split(",")
        let __clsName = "bld_" + __dp.join("_");
        let _all_classes = getClassNames(e.classList, __clsName);
        let __temp__styling = `.${__clsName}{${styleToString(formatStyle)}}`;
        let elProp = { ...e.attributes, className: _all_classes };

        if (!pageStyle.current.includes(__temp__styling)) {
            if (formatStyle.hasOwnProperty("animationName")) {

                let animateClassName = __clsName + ".animate";

                let __anim__styling = `.${animateClassName}{animation-name:${formatStyle["animationName"]};animation-fill-mode: forwards;}`;

                delete formatStyle["animationName"];

                let __temp__styling = `.${__clsName}{${styleToString(formatStyle)};}`;
                if (!pageStyle.current.includes(__temp__styling)) {
                    pageStyle.current = [...pageStyle.current, __temp__styling, __anim__styling];
                }

                elProp = { ...elProp, ["data-has-animation"]: "true" }

            } else {
                pageStyle.current = [...pageStyle.current, __temp__styling]
            }
        }

        // let elProp = { className: e.classList, "data-path": props.datapath };
        if (e.elements.length > 0) {
            //has sub elem

            if (e.elements.length < 2) {
                //single element
                let htmlCon = "";
                if (e.hasOwnProperty("inHTML")) htmlCon = e.inHTML;

                return React.createElement(e.elemType, elProp, <GenerateHTMLComp datapath={props.datapath + '0,'} element={e.elements[0]} >{htmlCon}</GenerateHTMLComp>);
            } else {
                //more then one element
                let allElems = [];
                return React.createElement(e.elemType, elProp, <MultiHTMLComp datapath={props.datapath} e={e.elements} />);
            }

        } else {
            let htmlCon = "";
            if (e.hasOwnProperty("inHTML")) htmlCon = decodeURIComponent(e.inHTML);

            if (e.elemType === "img") {

                return React.createElement(e.elemType, elProp);
            }


            return React.createElement(e.elemType, elProp, [parse(htmlCon)]);

        }
    }

    const pageFunctionMoveToTop = () => {

        document.querySelector(".webPagePrev").scrollTop = 0;
    }

    const bindScrollingListners = () => {
        let _els = document.querySelectorAll(`a[href="modify:pageFunctionMoveToTop"]`);
        for (let _e of _els) {

            _e.removeAttribute("href");
            _e.addEventListener("onclick", () => {
                pageFunctionMoveToTop();
            })
        }
    }

    const getCurrentScollPosition = (e) => {
        // const position = window.pageYOffset;
        // scrollPosition.current = (position);
        // 
        let __posTop = document.querySelector('.webPagePrev').scrollTop;

        let __elm = document.querySelectorAll('[data-has-animation]');
        let __wh = window.innerHeight;


        for (let __e of __elm) {
            if (__posTop > (__e.getBoundingClientRect().top - (__wh * 0.9))) {
                if (!__e.classList.contains("animate")) __e.classList.add("animate");
            }
        }
    }



    return (<>
        <div className='webPagePrev'>
            {(prevPage.loaded && prevPage.authorized) ?
                <>
                    <div className='web_page_preview'>
                        <FontLoader fontList={prevPage.page.fonts} />
                        {
                            prevPage.page.elements.map((e, i) => {
                                if (prevPage.page.elements.length == (i + 1)) {
                                    cssSheetPreviewState.setCssSheet(pageStyle.current.join("\n"))
                                }

                                return (


                                    <GenerateHTMLComp key={i} datapath={i + ','} element={e} />

                                );
                            })
                        }
                    </div>
                </>
                :
                <>
                    {(prevPage.loaded) ? "Loading" : "Unauthorized"}
                </>
            }

        </div>
        <SetStyle />
    </>
    )
}
