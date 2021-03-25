import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";

// i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// components
import { HelloPage } from "./HelloPage";
import { Select } from "./Select";

const supportedLanguages = ["en", "fr"];

// i18n config
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    debug: false,
    detection: {
      /**
       * TODO
       * prioritize path before localStorage,
       * on path 'lang' change localStorage will change as well
       */
      order: ["path", "localStorage"],
      lookupLocalStorage: "language",
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
    resources: {
      en: {
        translation: {
          hi: "hi this is react",
        },
      },
      fr: {
        translation: {
          hi: "bonjour",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

const App = withRouter((props) => {
  const { history } = props;

  const [selected, setSelected] = useState(
    localStorage.getItem("language", "")
  );

  const onChange = (e) => {
    const { value } = e.currentTarget;

    history.push(`/${value}`);
    i18n.changeLanguage(value);
    setSelected(value);
  };

  return (
    <div>
      <Select
        value={selected}
        onChange={onChange}
        options={supportedLanguages}
      />
      <Switch>
        <Redirect exact from="/" to={`/${i18n.language}`} />
        <Route exact path={`/:lang(en|fr)`}>
          <HelloPage />
        </Route>
      </Switch>
    </div>
  );
});

export default App;
