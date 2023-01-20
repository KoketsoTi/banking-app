'use strict';

/**
 * newapplication service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newapplication.newapplication');
