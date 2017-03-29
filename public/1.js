webpackJsonp([1,4],{

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(33);

var _reactRouterDom = __webpack_require__(58);

var _LoginComponent = __webpack_require__(922);

var _LoginComponent2 = _interopRequireDefault(_LoginComponent);

var _actions = __webpack_require__(148);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginContainer = _react2.default.createClass({
  displayName: 'LoginContainer',

  propTypes: {
    requestLogin: _react.PropTypes.func,
    location: _react.PropTypes.object,
    authentication: _react.PropTypes.object
  },
  getInitialState: function getInitialState() {
    return {
      redirectToReferrer: false
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.authentication.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  },
  submit: function submit(values) {
    if (values.username && values.password) {
      this.props.requestLogin(values.username, values.password);
      this.setState({ redirectToReferrer: true });
    }
  },
  render: function render() {
    var redirectToReferrer = this.state.redirectToReferrer;


    if (redirectToReferrer) {
      return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/home' });
    }

    return _react2.default.createElement(_LoginComponent2.default, { onSubmit: this.submit });
  }
});

var mapStateToProps = function mapStateToProps(_ref) {
  var authReducer = _ref.authReducer;

  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated
    }
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    requestLogin: function requestLogin(username, password) {
      return dispatch((0, _actions.requestLogin)(username, password));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginContainer);

/***/ }),

/***/ 922:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(274);

var _reactstrap = __webpack_require__(273);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function Login(props) {
  return _react2.default.createElement(
    _reactstrap.Container,
    null,
    _react2.default.createElement(
      _reactstrap.Row,
      null,
      _react2.default.createElement(
        _reactstrap.Col,
        { sm: { size: 6, push: 2, pull: 2, offset: 1 } },
        _react2.default.createElement(
          _reactstrap.Form,
          { onSubmit: props.handleSubmit },
          _react2.default.createElement(
            _reactstrap.FormGroup,
            null,
            _react2.default.createElement(
              _reactstrap.Label,
              { htmlFor: 'userName' },
              'Username: '
            ),
            _react2.default.createElement(_reduxForm.Field, { name: 'username', component: 'input', type: 'text' })
          ),
          _react2.default.createElement(
            _reactstrap.FormGroup,
            null,
            _react2.default.createElement(
              'label',
              { htmlFor: 'password' },
              'password: '
            ),
            _react2.default.createElement(_reduxForm.Field, { name: 'password', component: 'input', type: 'password' })
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            { type: 'submit' },
            'Submit'
          )
        )
      )
    )
  );
};

Login.propTypes = {
  requestLogin: _react.PropTypes.func,
  handleSubmit: _react.PropTypes.func.isRequired
};

var LoginForm = (0, _reduxForm.reduxForm)({
  form: 'login'
})(Login);

exports.default = LoginForm;

/***/ })

});
//# sourceMappingURL=1.js.map