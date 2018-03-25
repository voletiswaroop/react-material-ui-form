"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i.test(value)
  );
};