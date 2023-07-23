import "./Pages.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import ContactCard from "./Cards/ContactCard";
import { useMediaQuery } from 'react-responsive';

function ContactList() {
    const firebaseConfig = {
        apiKey: "AIzaSyBJZM6jHx6kumiBnxZsrLdmqCdUYfioWyA",
        authDomain: "cv-builder-327dd.firebaseapp.com",
        databaseURL: "https://cv-builder-327dd.firebaseio.com",
        projectId: "cv-builder-327dd",
        storageBucket: "cv-builder-327dd.appspot.com",
        messagingSenderId: "455887527081",
        appId: "1:455887527081:web:15ce6381008f0163",
        measurementId: "G-GZPVRSB54N"
    };
    const app = initializeApp(firebaseConfig);
    let auth = getAuth(app);
    const [isReady, setIsReady] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState(null);
    const [info, setInfo] = React.useState([]);
    const navigate = useNavigate();
    function navToAdd() {
        navigate("Contact", { replace: true });
    }
    const getData = async () => {
        setIsReady(false)
        if (auth.currentUser == null) {
            await signInAnonymously(auth)
        }
        return auth.currentUser.getIdToken().then(async token => {
            console.log(token)
            await fetch("https://us-central1-cv-builder-327dd.cloudfunctions.net/api/contact",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw Error('Could not fetch the data')
                    }
                    else if (response.ok) {
                        return response.json()
                    }
                })
                .then((data) => {
                    setIsReady(true)
                    return setInfo(data)
                })
                .catch(err => {
                    setError(err.message)
                })
            setMessage("")
        });
    }
    React.useEffect(() => {
        getData();
    }, [])
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
        <div className="list">
            {isDesktopOrLaptop && <div>
                <article className="services services1">
                    <h2>Your Information:</h2>
                    {!isReady && <div className="loading alert alert-info" role="alert">Loading...</div>}
                    <div className="info-list">
                        {info.length === 0 && <div className="noInfo">No items</div>}
                        {error && <div className="error">{error}</div>}
                        {info.map(
                            (e) => {
                                return (
                                    <ContactCard
                                        info={e}
                                        getData={getData} />
                                )
                            })}
                    </div>
                    <button onClick={navToAdd} className="add-btn btn btn-outline-info">Add +</button>
                </article>
            </div>}
            {isTabletOrMobile && <div>
                <article className="services-mobile services1">
                    <h2>Your Information:</h2>
                    {!isReady && <div className="loading alert alert-info" role="alert">Loading...</div>}
                    <div className="info-list">
                        {info.length === 0 && <div className="noInfo">No items</div>}
                        {error && <div className="error">{error}</div>}
                        {info.map(
                            (e) => {
                                return (
                                    <ContactCard
                                        info={e}
                                        getData={getData} />
                                )
                            })}
                    </div>
                    <button onClick={navToAdd} className="add-btn-mobile btn btn-outline-info">Add +</button>
                </article>
            </div>}
        </div>
    );
}

export default ContactList;