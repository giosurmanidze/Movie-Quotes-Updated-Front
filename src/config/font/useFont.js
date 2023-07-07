import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default function useFont() {
  const { locale } = useI18n({ useScope: "global" });

  return computed(() => {
    return locale.value === "en"
      ? "font-[HelveticaEnglish]"
      : "font-[HelveticaGeorgianLight]";
  });
}
