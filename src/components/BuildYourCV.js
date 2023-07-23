import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import "./Pages.css";
import { useMediaQuery } from 'react-responsive';

function BuildYourCV() {
    let token;
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
    async function getToken() {
        if (auth.currentUser == null) {
            await signInAnonymously(auth)
        } else {
            return await auth.currentUser.getIdToken();

        }
    }
    token = getToken()

    const [templateId, setTemplateId] = React.useState("");
    const [waiting, setWaiting] = React.useState(true);
    const [isReady, setIsReady] = React.useState(false);
    const [downlaod, setDownload] = React.useState("");
    const [formData, setFormData] = React.useState({
        "templateId": templateId,
        "userId": "new10"
    });

    const fetchData = async () => {
        if (auth.currentUser == null) {
            await signInAnonymously(auth)
        }
        return auth.currentUser.getIdToken().then(async token => {
            console.log(token)
            await fetch("https://us-central1-cv-builder-327dd.cloudfunctions.net/api/request",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        setWaiting(true)
                    }
                    if (response.ok) {
                        setWaiting(false)
                        return response.text()
                    }
                })
                .then((data) => {
                    setDownload(data)
                })
            setIsReady(true)

        });
    }


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })



    return (
        <div className="list">
           {isDesktopOrLaptop &&  <div>
                <article className="services-build">
                <h2>Build your CV:</h2>
                <div className="build">
            <div className="workList">
            <div className="build-container">
                <h5 className="get-link">Click the button to build</h5>
                <button onClick={fetchData} disabled={!waiting} type="button" className="build-btn btn btn-outline-info" >Build your CV</button>
                {isReady && <a className="download" href={downlaod}>**Click here to download your CV **</a>}
            </div>
            </div>
        </div>
                </article>
            </div>}
            {isTabletOrMobile &&  <div>
                <article className="services2-mobile">
                <h2>Build your CV:</h2>
                <div className="build">
            <div className="workList">
            <div className="build-container">
                <h5 className="get-link">Click the button to build</h5>
                <button onClick={fetchData} disabled={!waiting} type="button" className="build-btn-mobile btn btn-outline-info" >Build your CV</button>
                {isReady && <a className="download" href={downlaod}>**Click here to download your CV **</a>}
            </div>
            </div>
        </div>
                </article>
            </div>}
        </div>
    );
}

export default BuildYourCV;