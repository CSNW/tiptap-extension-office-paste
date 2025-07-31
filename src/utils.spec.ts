import assert from "node:assert";
import { describe, it } from "node:test";
import { parseLetterNumber, parseRomanNumber } from "./utils.js";

await describe(`parseLetterNumber function`, async () => {
  await it(`test one digit numbers`, () => {
    assert.strictEqual(parseLetterNumber(`a`), 1);
    assert.strictEqual(parseLetterNumber(`b`), 2);
    assert.strictEqual(parseLetterNumber(`g`), 7);
    assert.strictEqual(parseLetterNumber(`n`), 14);
  });

  await it(`test two digit numbers`, () => {
    assert.strictEqual(parseLetterNumber(`aa`), 27);
    assert.strictEqual(parseLetterNumber(`be`), 57);
    assert.strictEqual(parseLetterNumber(`gt`), 202);
    assert.strictEqual(parseLetterNumber(`no`), 379);
  });

  await it(`test big numbers`, () => {
    assert.strictEqual(parseLetterNumber(`popeye`), 197241907);
    assert.strictEqual(parseLetterNumber(`openslides`), 84828503480493);
    assert.strictEqual(parseLetterNumber(`magma`), 5963335);
  });

  await it(`test case irrelevant`, () => {
    assert.strictEqual(parseLetterNumber(`scHwaRzteE`), 103858431216103);
  });
});

await describe(`parseRomanNumber function`, async () => {
  await it(`test simple one digit roman numbers`, () => {
    assert.strictEqual(parseRomanNumber(`I`), 1);
    assert.strictEqual(parseRomanNumber(`L`), 50);
    assert.strictEqual(parseRomanNumber(`M`), 1000);
  });

  await it(`test summation`, () => {
    assert.strictEqual(parseRomanNumber(`III`), 3);
    assert.strictEqual(parseRomanNumber(`XII`), 12);
    assert.strictEqual(parseRomanNumber(`CV`), 105);
    assert.strictEqual(parseRomanNumber(`DX`), 510);
  });

  await it(`test subtraction`, () => {
    assert.strictEqual(parseRomanNumber(`XL`), 40);
    assert.strictEqual(parseRomanNumber(`VX`), 5);
    assert.strictEqual(parseRomanNumber(`ICD`), 399);
  });

  await it(`test complex operations`, () => {
    assert.strictEqual(parseRomanNumber(`IDC`), 599);
    assert.strictEqual(parseRomanNumber(`CMVI`), 906);
  });

  await it(`test case irrelevant`, () => {
    assert.strictEqual(parseRomanNumber(`cMvI`), 906);
  });
});
