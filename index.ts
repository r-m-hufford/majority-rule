import { handleTransmission } from "./transmission";

const testStrings = [
  " I don't want to take it.",
  " I don't want to take...",
  " I don't want to take away.",
  " I don't want to take away",
  " I don't want to take away from",
  " I don't want to take away from",
  " I don't want to take away from the",
  " I don't want to take away from the",
  " I don't want to take away from the truth!",
  " to take away from the truth, that's fine, but...",
  " and take away from the truth! That's fine. But I needed... ",
  " away from the truth! That's fine. But I needed to hear this.",
];

const transmission = handleTransmission(testStrings);
console.log(transmission);