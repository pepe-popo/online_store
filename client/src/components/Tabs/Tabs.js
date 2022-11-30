import React from "react";
import './Tabs.css'
import { useState } from "react";

const Tabs = ({ sections, types }) => {
    const [active, setActive] = useState(null);
    const [visibleContent, setVisibleContent] = useState([])

    return (
        <div className="tabs_wrapper">
            <div
                onClick={(event) => {
                    active === event.target.id ? setActive(null) : setActive(event.target.id);
                    setVisibleContent(types.filter(type => event.target.id === type.sectionId));
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
                className={active ? "tabs_content_container visible" : "tabs_content_container hidden"}>
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