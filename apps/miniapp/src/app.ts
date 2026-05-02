import { createI18n } from "@muxiao-fek-base/i18n";
import { formatDate } from "@muxiao-fek-base/utils";

const i18n = createI18n({
  baseLocale: "zh-CN",
});

export default function App() {
  const now = new Date();
  const formattedDate = formatDate(now, "YYYY-MM-DD");

  return {
    data: {
      date: formattedDate,
      message: i18n.t("common_submit"),
    },
    onLoad() {
      console.log("Miniapp loaded");
    },
  };
}