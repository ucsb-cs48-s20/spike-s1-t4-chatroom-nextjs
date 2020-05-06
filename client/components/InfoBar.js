import React from 'react';
import Link from "next/link";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

import "./InfoBar.scss";

const InfoBar = (props) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img
                    className="onlineIcon"
                    src={onlineIcon}
                />
                <h3>{`Room: ${props.room}`}</h3>
            </div>
            <div className="rightInnerContainer">
                <Link href="/">
                    <a><img src={closeIcon} /></a>
                </Link>
            </div>
        </div>
    );
};

export default InfoBar;
