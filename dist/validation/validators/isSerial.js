"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return (/^([-\s\da-zA-Z]+)$/.test(value)
  );
}; // eslint-disable-line