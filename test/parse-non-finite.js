'use strict';

/**
 * НОВА ПОВЕДІНКА кроку 02 (вимога, не характеризація).
 * На коміті перед зміною цей файл ЧЕРВОНИЙ — і це його сенс.
 * Джерело: баг, зафіксований тестом кроку 01 (parse(Infinity) === Infinity),
 * README обіцяє number|null, format(Infinity) вже дає null.
 */
var assert = require('assert');
var bytes = require('..');

describe('parse: нескінченні числа відкидаються (крок 02)', function () {
  it('parse(Infinity) повертає null', function () {
    assert.strictEqual(bytes.parse(Infinity), null);
  });

  it('parse(-Infinity) повертає null', function () {
    assert.strictEqual(bytes.parse(-Infinity), null);
  });
});
