'use strict';

/**
 * loan-application service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::loan-application.loan-application');
