const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a lead
// @route   POST /api/leads
const createLead = async (req, res) => {
  try {
    const { name, email, source, status } = req.body;
    
    const lead = await Lead.create({
      name,
      email,
      source,
      status,
      createdBy: req.userId
    });
    
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
const updateLead = async (req, res) => {
  try {
    const { status, name, email, source } = req.body;
    
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    if (lead.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, name, email, source },
      { new: true }
    );
    
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    if (lead.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await lead.deleteOne();
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get analytics
// @route   GET /api/leads/analytics/stats
const getAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ createdBy: req.userId });
    const newLeads = await Lead.countDocuments({ createdBy: req.userId, status: 'New' });
    const contactedLeads = await Lead.countDocuments({ createdBy: req.userId, status: 'Contacted' });
    const convertedLeads = await Lead.countDocuments({ createdBy: req.userId, status: 'Converted' });
    
    res.json({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeads, createLead, updateLead, deleteLead, getAnalytics };