import fromPairs from "lodash/fromPairs";
import isEqual from "lodash/isEqual";
import toPairs from "lodash/toPairs";
import differenceWith from "lodash/differenceWith";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 *
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const objectDiff = (a, b) =>
    fromPairs(differenceWith(toPairs(a), toPairs(b), isEqual));

export const firstLetterCollect = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("");
};
