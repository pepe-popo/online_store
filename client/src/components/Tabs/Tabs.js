import React from "react";
import './Tabs.css'
import { useState } from "react";
import { nonAuthFetching } from "../../http/Index";

const Tabs = ({ sections }) => {
    const [sectionId, setSectionId] = useState(null);
    const [visibleContent, setVisibleContent] = useState([])




    return (
        <div className="tabs_wrapper">
            <div
                onClick={(event) => {
                    sectionId === event.target.id ? setSectionId(null) : setSectionId(event.target.id); // при клике помещаю id раздела в стейт sectionId
                    nonAuthFetching(`type/getAll/${event.target.id}`)
                    .then(data => setVisibleContent(data))
                        
                }}
                className="tabs_container">
                {sections.map(({ id, name }) =>
                    <div className="tabs_button_container" key={id}>
                        <div
                            id={id}
                            className="tabs_button">
                            {name}
                        </div>
                    </div>
                )}
            </div>
            <div
                className={sectionId ? "tabs_content_container visible" : "tabs_content_container hidden"}>
                {visibleContent.map(({ id, name }) =>
                    <a href="/" key={id} className="tabs_content">
                        {name}
                    </a>
                )}
            </div>
        </div>
    )
}

export default Tabs;