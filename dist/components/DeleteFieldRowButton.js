'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteFieldRowButton = (_temp = _class = function (_React$Component) {
  _inherits(DeleteFieldRowButton, _React$Component);

  function DeleteFieldRowButton(props) {
    _classCallCheck(this, DeleteFieldRowButton);

    var _this = _possibleConstructorReturn(this, (DeleteFieldRowButton.__proto__ || Object.getPrototypeOf(DeleteFieldRowButton)).call(this, props));

    _initialiseProps.call(_this);

    var deletefieldrow = _this.props.buttonComp.props.deletefieldrow;

    if (deletefieldrow === undefined) {
      throw new Error('DeleteFieldRowButton element requires "deletefieldrow" prop');
    }
    if (deletefieldrow.match(/\w+\[\d+\]/) === null) {
      throw new Error('"deletefieldrow" prop should match /\\w+\\[\\d+\\]/');
    }
    return _this;
  }

  _createClass(DeleteFieldRowButton, [{
    key: 'render',
    value: function render() {
      var buttonComp = this.props.buttonComp;

      return _react2.default.cloneElement(buttonComp, {
        onClick: this.onClick
      });
    }
  }]);

  return DeleteFieldRowButton;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onClick = function () {
    var _props = _this2.props,
        onRequestRowDelete = _props.onRequestRowDelete,
        _props$buttonComp$pro = _props.buttonComp.props,
        onClick = _props$buttonComp$pro.onClick,
        deletefieldrow = _props$buttonComp$pro.deletefieldrow;


    onRequestRowDelete(deletefieldrow);
    onClick();
  };
}, _temp);
exports.default = DeleteFieldRowButton;