#!/usr/bin/env node
const {readFileSync} = require('node:fs');
const {planCredits} = require('./core.js');
const args = process.argv.slice(2);
try {
  let values;
  if (args.length === 1 && args[0] === '--stdin') {
    const data = JSON.parse(readFileSync(0,'utf8'));
    values = [data.balance,data.fast,data.match];
  } else {
    if (args.length !== 3 || !args.every(s => /^\d+$/.test(s))) throw Error('Usage: doja-portrait-preflight BALANCE FAST MATCH | --stdin');
    values = args.map(Number);
  }
  const plan = planCredits(...values);
  console.log(JSON.stringify(plan));
  process.exitCode = plan.remaining < 0 ? 2 : 0;
} catch (error) { console.error(error.message); process.exitCode = 1; }
