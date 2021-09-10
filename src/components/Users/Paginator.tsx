import mU from "./Users.module.css";
import React from "react";


type PropsType={
    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(currentPage:number)=>void
}


let Paginator:React.FC<PropsType>=({totalUsersCount, pageSize, currentPage, onPageChanged})=> {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let prevNextBtn = 4
    function PageChangedPrev (){
        if (currentPage<=prevNextBtn){
            prevNextBtn=1
        }
        if(currentPage!==1){
            onPageChanged(  currentPage-prevNextBtn)
        }
    }
    function PageChangedNext (){
        if (currentPage>pagesCount-prevNextBtn){
            prevNextBtn=1
        }
        if(currentPage !== pagesCount){
            onPageChanged( currentPage+prevNextBtn)
        }
    }


        return (

        <div className={mU.selected_pages_container}>

            <div className={currentPage === 1 ? mU.prev_noActive : mU.prev_Active}
                 onClick={PageChangedPrev}>
                Prev
            </div>


            {pages.map(p => {
                for (let e = 1; e < 4; e++) {
                    if (p === 1 || p === pagesCount || p === currentPage || p === currentPage - e || p === currentPage + e) {
                        return (
                            <div className={currentPage === p ? mU.selected_page_active : mU.selected_page}
                                 onClick={() => {
                                     onPageChanged(p)
                                 }}>
                                {p}
                            </div>
                        )
                    } else if (p === currentPage - 4 || p === currentPage + 4) {
                        return <div className={mU.selected_page_elipsis}>...</div>
                    }
                }
            })}


            <div className={currentPage === pagesCount ? mU.next_noActive : mU.next_Active}
                 onClick={PageChangedNext}>
                Next
            </div>
        </div>

    )
}


export default Paginator