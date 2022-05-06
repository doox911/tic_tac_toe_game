/**
 * Types
 */
import { ApplicationRoutes } from '../types';

const root: ApplicationRoutes = [{
  path: '/',
  action: function (req, res, next) {
    res.send('Tic-Tac-Toe server');
  }
}]

module.exports = root;