import preloader from "../../../assets/images/ajax-loader.gif";
import React from "react";


function Preloader() {

    return (
        <img alt="loading..." src={preloader}
             style={{position: "absolute", width: "7em", top: "8.5em", left: "53.5%"}}/>
    )
}

export default Preloader;