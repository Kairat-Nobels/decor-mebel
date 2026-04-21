import React from 'react';

const HomeConnectItem = (props) => {
    const { logo } = props;
    return (
        <div data-aos="fade-left" className="connect-item">
            <a href={props.link} target="_blank" rel="noreferrer"><button className='connect-button'>{logo}</button></a>
        </div>
    )
}

export default HomeConnectItem;