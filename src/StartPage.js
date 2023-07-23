import "./StartPage.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import AllSections from "./components/allsections";
import { Route, Routes, Link, useNavigate} from "react-router-dom";
import CreateCV from "./components/CreateCV";
import WorkExperince from "./components/WorkExperince"
import Education from "./components/Education"
import Languages from "./components/Languages"
import Contact from "./components/Contact"
import PersonalInfo from "./components/PersonalInfo"
import BuildYourCV from "./components/BuildYourCV";
import WorkList from "./components/WorkList";
import EducationList from "./components/EducationList";
import LanguagesList from "./components/LanguagesList";
import ContactList from "./components/ContactList";
import PersonalList from "./components/PersonalList";

function StartPage() {
  return (
    <div className="start-page">
      <BrowserRouter>
        <Header />
        <AllSections />
        <Routes>
                <Route path="CV-Builder//*" element={<CreateCV />}></Route>
                <Route path="CV-Builder/PersonalList/PersonalInfo" element={<PersonalInfo />}></Route>
                <Route path="CV-Builder/WorkList/WorkExperince" element={<WorkExperince />}></Route>
                <Route path="CV-Builder/WorkList//*" element={<WorkList />}></Route>
                <Route path="CV-Builder/EducationList//*" element={<EducationList />}></Route>
                <Route path="CV-Builder/LanguagesList//*" element={<LanguagesList />}></Route>
                <Route path="CV-Builder/ContactList//*" element={<ContactList />}></Route>
                <Route path="CV-Builder/PersonalList//*" element={<PersonalList />}></Route>
                <Route path="CV-Builder/EducationList/Education" element={<Education />}></Route>
                <Route path="CV-Builder/LanguagesList/Languages" element={<Languages />}></Route>
                <Route path="CV-Builder/ContactList/Contact" element={<Contact />}></Route>
                <Route path="CV-Builder/BuildYourCV" element={<BuildYourCV />}></Route>
            </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default StartPage;