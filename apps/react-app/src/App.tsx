import { useState } from "react";
import { createI18n } from "@muxiao-fek-base/i18n";

const i18n = createI18n({
  baseLocale: "zh-CN",
});

export default function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert(i18n.t("common_submit") + ": " + message);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>{i18n.t("common_submit")}</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={i18n.t("common_search")}
      />
      <button onClick={handleSubmit}>{i18n.t("common_submit")}</button>
    </div>
  );
}