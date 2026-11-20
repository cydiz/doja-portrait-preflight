'use strict';
function planCredits(balance, fast, match) {
  if (![balance, fast, match].every(n => Number.isSafeInteger(n) && n >= 0)) throw Error('Enter whole numbers of zero or more.');
  const cost = fast * 15 + match * 22;
  if (!Number.isSafeInteger(cost)) throw Error('Plan exceeds the supported range.');
  return { balance, fast, match, cost, remaining: balance - cost };
}
if (typeof module !== 'undefined') module.exports = { planCredits };
