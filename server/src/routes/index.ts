/**
 * Types
 */
import { Application, ApplicationRoutes } from '../types';

/**
 * Routes
 */
const routes: ApplicationRoutes = [
  ...require('./root')
];

module.exports = function (application: Application) {
  routes.forEach(route => {
    application.use(route.path, route.action);
  })
}