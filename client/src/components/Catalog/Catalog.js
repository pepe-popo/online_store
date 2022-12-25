import React from "react";
import './Catalog.css'
import { useState } from "react";
import { nonAuthFetching } from "../../http/Index";

const Catalog = ({ sections }) => {
    const [sectionId, setSectionId] = useState(null);
    const [visibleContent, setVisibleContent] = useState([])




    return (
        <div className="catalog_wrapper">
            <div
                onClick={(event) => {
                    sectionId === event.target.id ? setSectionId(null) : setSectionId(event.target.id); // при клике помещаю id раздела в стейт sectionId
                    nonAuthFetching(`type/getAll/${event.target.id}`)
                    .then(data => setVisibleContent(data))
                        
                }}
                className="catalog_container">
                {sections.map(({ id, name }) =>
                    <div className="catalog_button_container" key={id}>
                        <div
                            id={id}
                            className="catalog_button">
                            {name}
                        </div>
                    </div>
                )}
            </div>
            <div
                className={sectionId ? "catalog_content_container visible" : "catalog_content_container hidden"}>
                {visibleContent.map(({ id, name }) =>
                    <a href="/" key={id} className="catalog_content">
                        {name}
                    </a>
                )}
            </div>
        </div>
    )
}

export default Catalog;