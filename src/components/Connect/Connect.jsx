import React from 'react';
import HomeConnectItem from './ConnectItem';
import "./connect.scss";
import { AiFillFacebook, AiOutlineGoogle, AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";

const Connect = () => {
    return (
        <div className="home-connect page-container">
            <h3 data-aos="fade-up">Наши социальные сети!</h3>
            <div className="connections">
                <HomeConnectItem logo={<AiFillFacebook />} link="https://www.facebook.com/" />
                {/* <HomeConnectItem logo={<AiOutlineWhatsApp />} link="https://wa.me/996709317635" /> */}
                <HomeConnectItem logo={<AiOutlineWhatsApp />} link="https://wa.me/996700762347" />
                <HomeConnectItem logo={<AiOutlineGoogle />} link="https://www.google.com/" />
                <HomeConnectItem logo={<AiFillInstagram />} link="https://www.instagram.com/ma1ika.22" />
            </div>
        </div>
    )
}

export default Connect;