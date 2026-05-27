const express = require('express');
const { getLeads, createLead, updateLead, deleteLead, getAnalytics } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/analytics/stats')
  .get(getAnalytics);

router.route('/:id')
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;