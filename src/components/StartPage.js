import "./StartPage.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import AllSections from "./allsections";
import { Route, Routes, Link, useNavigate} from "react-router-dom";
import CreateCV from "./CreateCV";
import WorkExperince from "./WorkExperince"
import Education from "./Education"
import Languages from "./Languages"
import Contact from "./Contact"
import PersonalInfo from "./PersonalInfo"
import BuildYourCV from "./BuildYourCV";
import WorkList from "./WorkList";
import EducationList from "./EducationList";
import LanguagesList from "./LanguagesList";
import ContactList from "./ContactList";
import PersonalList from "./PersonalList";

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