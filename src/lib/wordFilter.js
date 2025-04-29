import { Filter } from "bad-words";

const blacklist = ["ควย", "หี", "แตด"];

const englishFilter = new Filter();

export function isProfane(word) {
  const cleaned = word.trim().toLowerCase();

  const foundInCustom = blacklist.some((badword) => cleaned.includes(badword));
  const foundInEnglish = englishFilter.isProfane(cleaned);

  return foundInCustom || foundInEnglish;
}
