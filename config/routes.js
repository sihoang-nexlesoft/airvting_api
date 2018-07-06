/**
 * Created by A on 7/18/17.
 */
'use strict';
const User = require('../route/User');

module.exports = [

    { method: 'POST', path: '/api/v1/signup', config: User.signUp },

    { method: 'PUT', path: '/api/v1/get_verify', config: User.getVerify },
    { method: 'POST', path: '/api/v1/verify', config: User.verify },
    // { method: 'POST', path: '/api/v1/resend_verify', config: User.resendVerify },

    // { method: 'GET', path: '/api/v1/password_reset', config: User.passwordReset },
    // { method: 'POST', path: '/api/v1/password_reset', config: User.passwordReset },
    // { method: 'PUT', path: '/api/v1/password_reset', config: User.passwordReset }
];