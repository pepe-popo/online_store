import React, { useState } from 'react';
import TabContent from './TabContent';
import './Tabs.css'

const Tabs = ({ items }) => {
    const [active, setActive] = useState(null);

    const openTab = event => setActive(event.target.dataset.index);

    return (
        <div>
            <div className='tabs'>
                {items.map((n, i) => (
                    <button
                        key={n.title}
                        className={`tablinks ${i === active ? 'acrive' : null}`}
                        onClick={openTab}
                        data-index={i}
                    >{n.title}
                    </button>
                ))}
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    )
}

export default Tabs;