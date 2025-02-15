import _ from "lodash";

/**
 * This code is licensed under the terms of the MIT license
 *
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
const objectDiff = (a, b) =>
    _.fromPairs(_.differenceWith(_.toPairs(a), _.toPairs(b), _.isEqual));

let a = {
    name: "haha",
    age: 12,
    address: {
        city: "beijing",
        street: "tiantan",
        another: {
            a: 1,
            b: 2,
        },
    },
};

let b = {
    name: "haha",
    age: 13,
    address: {
        city: "beijing",
        street: "tiantan",
        another: {
            a: 1,
            b: 3,
        },
    },
};

console.log(objectDiff(a, b));
