import "./Card.css";
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth"
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import EditContact from "../EditContact";
import { useMediaQuery } from 'react-responsive';

function Card(props) {
    const [isClicked, setIsClicked] = React.useState(false)
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();
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
    const deleteData = async (e) => {
        e.preventDefault();
        setMessage("Submiting...")
        if (auth.currentUser == null) {
            await signInAnonymously(auth)
        }
        return auth.currentUser.getIdToken().then(async token => {
            console.log(token)
            await fetch(`https://us-central1-cv-builder-327dd.cloudfunctions.net/api/contact/${props.info.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }
            ).then((response) => {
                if (response.ok) {
                    setMessage("Success")
                    return response
                }
                else if (!response === 200) {
                    throw Error('Could not fetch the data')
                }
            }).catch(err => {
                setMessage(err.message)
            })
            props.getData()
        })
    }
    const app = initializeApp(firebaseConfig);
    let auth = getAuth(app);
    function nav() {
        setIsClicked(true);
        navigate("EditContact", { replace: true });
    }
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
        <div>
            {isDesktopOrLaptop && <div className="card card-background text-white mb-3" >
                <div className="card-body">
                    <div className="delete-edit">
                        <button onClick={nav} className="edit-btn btn btn-outline-light btn-sm">Edit</button>
                        <button onClick={deleteData} className="delete-btn btn btn-outline-light btn-sm">Delete</button>
                    </div>
                    <h5 className="card-title">{props.info.data}</h5>
                    <h6 className="card-subtitle mb-2">{props.info.type}</h6>
                </div>
                {isClicked && <Routes>
                    <Route path="EditContact" element={<EditContact info={props.info} getData={props.getData} />}></Route>
                </Routes>}
            </div>}
            {isTabletOrMobile && <div className="card-mobile  card-background text-white mb-3" >
                <div className="card-body">
                    <div className="delete-edit">
                        <button onClick={nav} className="edit-btn btn btn-outline-light btn-sm">Edit</button>
                        <button onClick={deleteData} className="delete-btn btn btn-outline-light btn-sm">Delete</button>
                    </div>
                    <h5 className="card-title">{props.info.data}</h5>
                    <h6 className="card-subtitle mb-2">{props.info.type}</h6>
                </div>
                {isClicked && <Routes>
                    <Route path="EditContact" element={<EditContact info={props.info} getData={props.getData} />}></Route>
                </Routes>}
            </div>}
        </div>
    );
}

export default Card;