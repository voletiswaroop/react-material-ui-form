"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return (/^[a-zA-Z0-9-_\.]*$/i.test(value)
  );
}; // eslint-disable-line