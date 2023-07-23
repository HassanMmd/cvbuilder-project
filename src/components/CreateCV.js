import React from "react";
import "./createcv.css"
import { BsHandIndexThumb } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive';

function CreateCV() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
        <div className="create">
            <h1 className="icon-start"><BsHandIndexThumb /></h1>
            <h1>Click start to create your CV</h1>
        </div>
    )
}

export default CreateCV;