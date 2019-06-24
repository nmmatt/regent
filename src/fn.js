import mem from 'mem';
import dateAfterInclusive from './functions/date-after-inclusive';
import dateBeforeInclusive from './functions/date-before-inclusive';
import deepEquals from './functions/deep-equals';
import empty from './functions/empty';
import equals from './functions/equals';
import every from './functions/every';
import greaterThan from './functions/greater-than';
import greaterThanOrEquals from './functions/greater-than-equals';
import includes from './functions/includes';
import lessThan from './functions/less-than';
import lessThanOrEquals from './functions/less-than-equals';
import regex from './functions/regex';
import some from './functions/some';
import typeOf from './functions/type-of';

export default (id, custom) => mem((left, right, data) => {
  const fn = {
    dateAfterInclusive,
    dateBeforeInclusive,
    deepEquals,
    empty,
    equals,
    every,
    greaterThan,
    greaterThanOrEquals,
    includes,
    lessThan,
    lessThanOrEquals,
    regex,
    some,
    typeOf,
    ...custom,
  };

  try {
    const exec = key => fn[key](left, right, data, custom);
    return /^!/.test(id) ? !exec(id.slice(1)) : exec(id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`regent error:
        fn: "${id}"
        left: "${JSON.stringify(left)}"
        right: "${JSON.stringify(right)}"
        error: ${e}
      `);
  }

  return false;
});
