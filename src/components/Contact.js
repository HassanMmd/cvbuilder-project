import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useMediaQuery } from 'react-responsive';

function Contact() {
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
  const navigate = useNavigate();
  const [id, setId] = React.useState("");
  const [isReady, setIsReady] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState("");
  const [type, setType] = React.useState("EMAIL");
  const [info, setInfo] = React.useState([]);
  const [formData, setFormData] = React.useState({
    "id": id,
    "data": data,
    "type": type
  });
  const addData = async (e) => {
    e.preventDefault();
    setMessage("Submiting...")
    if (auth.currentUser == null) {
      await signInAnonymously(auth)
    }
    return auth.currentUser.getIdToken().then(async token => {
      console.log(token)
      await fetch("https://us-central1-cv-builder-327dd.cloudfunctions.net/api/contact",
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
          if (response.ok) {
            setMessage("Success 1 item added")
            return response
          }
          else if (!response === 200) {
            throw Error('Could not fetch the data')
          }
        }).catch(err => {
          setMessage(err.message)
        })
      setTimeout(function () {
        getData();
      }, 1000);
      restForm();
    });
  }
  function restForm() {
    formData.data = ""
    formData.type = ""
  }
  const getData = async () => {
    setIsReady(false)
    if (auth.currentUser == null) {
      await signInAnonymously(auth)
    }
    return await auth.currentUser.getIdToken().then(async token => {
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
  function navBack() {
    navigate("/CV-Builder/ContactList", { replace: true });
  }
  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  return (
    <div className="sections">
      {isDesktopOrLaptop && <section>
        <div>
          <article className="services services2">
            <div className="top-services">
              <h1>Contact</h1>
              <div>
                <h4 className="item-num">{info.length} in your list</h4>
                <button className="btn-submit btn btn-outline-info" onClick={navBack}>Preview your list</button>
              </div>
            </div>
            <form onSubmit={addData}>
              <label htmlFor="data">Your {formData.type}</label>
              <input type="text" className="form-control form-tex" id="data" name="data" value={formData.data} onChange={changeHandler} required></input>
              <label htmlFor="type">Via</label>
              <select className="form-select custom-select" id="type" name="type" value={formData.type} onChange={changeHandler} >
                <option>EMAIL</option>
                <option>PHONE</option>
                <option>LINKED_IN</option>
                <option>GITHUB</option>
                <option>WEBSITE</option>
                <option>PORTFOLIO</option>
                <option>LINK</option>
              </select>
              <button type="submit" className="btn-submit btn btn-success">Add</button>
            </form>
          </article>
          {message && <div className="message alert alert-info" role="alert">{message}</div>}
        </div>
      </section>}
      {isTabletOrMobile && <section>
        <div>
          <article className="services services2-mobile">
            <div className="top-services">
              <h1>Contact</h1>
              <div>
                <h4 className="item-num">{info.length} in your list</h4>
                <button className="btn-submit btn btn-outline-info" onClick={navBack}>Preview your list</button>
              </div>
            </div>
            <form className="form-mobile" onSubmit={addData}>
              <label htmlFor="data">Your {formData.type}</label>
              <input type="text" className="form-control form-control-mobile form-tex" id="data" name="data" value={formData.data} onChange={changeHandler} required></input>
              <label htmlFor="type">Via</label>
              <select className="form-select form-control-mobile custom-select" id="type" name="type" value={formData.type} onChange={changeHandler} >
                <option>EMAIL</option>
                <option>PHONE</option>
                <option>LINKED_IN</option>
                <option>GITHUB</option>
                <option>WEBSITE</option>
                <option>PORTFOLIO</option>
                <option>LINK</option>
              </select>
              <button type="submit" className="btn-submit-mobile btn btn-success">Add</button>
            </form>
          </article>
          {message && <div className="message alert alert-info" role="alert">{message}</div>}
        </div>
      </section>}
    </div>
  );
}
export default Contact;