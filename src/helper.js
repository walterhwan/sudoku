import { chunk } from "lodash";

export function strToBoard(rawProblemStr) {
  return chunk(rawProblemStr.split(''), 9)
}