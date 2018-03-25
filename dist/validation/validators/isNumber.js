"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return (/^([,.\d]+)$/.test(value)
  );
}; // eslint-disable-line