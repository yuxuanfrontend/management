import App from '../App'

import authenticate from '../pages/authenticate-form/authenticate'

import storagelcl from '../pages/storage/storage-lcl'

module.exports = [
  {
    path: '/authenticate',
    component: authenticate
  },
  {
    path: '/storage-lcl',
    component: storagelcl
  },
];
