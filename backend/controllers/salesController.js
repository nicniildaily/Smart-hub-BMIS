const BillingInvoices = require('../models/BillingInvoices');

async function getSalesReport(req, res) {
  try {
    // Example: aggregate total sales by month
    const sales = await BillingInvoices.findAll({
      attributes: [
        [BillingInvoices.sequelize.fn('DATE_TRUNC', 'month', BillingInvoices.sequelize.col('billing_date')), 'month'],
        [BillingInvoices.sequelize.fn('SUM', BillingInvoices.sequelize.col('total_amount')), 'total_sales'],
      ],
      group: ['month'],
      order: [['month', 'ASC']],
    });
    return res.json(sales);
  } catch (error) {
    console.error('Error fetching sales report:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getSalesReport,
};
