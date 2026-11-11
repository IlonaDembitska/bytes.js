'use strict';

/**
 * ХАРАКТЕРИЗАЦІЯ, НЕ ВИМОГА.
 * Фіксує поведінку parse() на нульовій точці форка 9ddc13b.
 * Якщо тест тут падає — спершу припускаємо, що зламали МИ.
 * Значення в assert отримані з фактичного прогону, а не виведені з коду.
 */
var assert = require('assert');
var bytes = require('..');

describe('characterization: parse — поточна поведінка', function () {
  // ПОВЕДІНКА: нескінченне число проходить крізь parse без змін.
  // ЦЕ СХОЖЕ НА БАГ і зафіксовано навмисне: format(Infinity) дає null, README обіцяє number|null.
  // Саме це твердження свідомо оновлює крок 02. Вхід: test/byte-format.js (Infinity).
  it('parse(Infinity) повертає Infinity (зафіксований баг)', function () {
    assert.strictEqual(bytes.parse(Infinity), Infinity);
  });

  // ПОВЕДІНКА: те саме для -Infinity. ЧОМУ: index.js#L142 перевіряє лише isNaN.
  it('parse(-Infinity) повертає -Infinity', function () {
    assert.strictEqual(bytes.parse(-Infinity), -Infinity);
  });

  // ПОВЕДІНКА: NaN — єдине число, яке parse відкидає. Вхід: test/byte-parse.js#L12.
  it('parse(NaN) повертає null', function () {
    assert.strictEqual(bytes.parse(NaN), null);
  });

  // ПОВЕДІНКА: скінченне число повертається як є. Вхід: Readme.md#L137.
  it('parse(1024) повертає 1024', function () {
    assert.strictEqual(bytes.parse(1024), 1024);
  });

  // ПОВЕДІНКА: рядок без одиниці дає число (не рядок). Вхід: Readme.md#L134.
  it('parse("1024") повертає число 1024', function () {
    assert.strictEqual(bytes.parse('1024'), 1024);
  });

  // ПОВЕДІНКА: рядок з одиницею множиться на 1024^4. Вхід: Readme.md#L8. Значення — з прогону blind 2.
  it('parse("1TB") повертає 1099511627776', function () {
    assert.strictEqual(bytes.parse('1TB'), 1099511627776);
  });

  // ПОВЕДІНКА: шістнадцятковий запис не розбирається як hex — parseInt бере лише "0".
  // ЧОМУ: коміт 33cc74b «Fix parsing byte string that looks like hex». Вхід: test/byte-parse.js#L94.
  it('parse("0x11") повертає 0', function () {
    assert.strictEqual(bytes.parse('0x11'), 0);
  });

  // ПОВЕДІНКА: одиниці "b" немає в regexp (index.js#L37), рядок іде гілкою parseInt і дробова частина зникає.
  // Вхід: test/byte-parse.js «Should drop partial bytes».
  it('parse("1.1b") повертає 1 через гілку parseInt', function () {
    assert.strictEqual(bytes.parse('1.1b'), 1);
  });
});
