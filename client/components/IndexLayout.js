import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import "./IndexLayout.scss";

const Layout = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="joinOuterContainer">
            <Head>
                <title>Chat Sign In</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
            </Head>
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link href={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit"
                     onClick={(event) => (!name || !room) ? event.preventDefault() : null}>Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Layout;