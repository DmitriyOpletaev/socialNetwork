import React, {useMemo, useState} from "react";
import m from "../Modal_Window_Styles.module.scss";
import {stringReformat} from "../../../utils/validators/string_formatting";

type DescriptionBlockProps = {
    tags: Array<string>
    description: string
}
export const DescriptionBlock = ({description, tags}: DescriptionBlockProps) => {

    const videoTags = useMemo(() => {
        if (tags) return tags.map((t: string) => (
            <span className={m.tag}>#{t}</span>
        ))
    }, [tags])

    const [isOpen, setIsOpen] = useState(false)
    let descriptionHtml = stringReformat(description)

    return (
        <div>
            <div className={`${m.description} ${isOpen && m.description_open}`}>
                <div dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
                <div className={m.tags}>
                    {videoTags}
                </div>
            </div>
            <div onClick={() => setIsOpen(!isOpen)}
                 className={m.more_description_button}>
                {!isOpen ? 'Ещё' : 'Свернуть'}
            </div>
        </div>
    )
}
