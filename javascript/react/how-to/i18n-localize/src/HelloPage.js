import React from "react";
import { useTranslation } from "react-i18next";

export const HelloPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("hi")}</h1>
    </div>
  );
};
