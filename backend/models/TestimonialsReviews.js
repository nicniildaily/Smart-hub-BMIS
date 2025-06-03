const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
const Users = require('./Users');

const TestimonialsReviews = sequelize.define('testimonials_reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
    },
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

TestimonialsReviews.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Users.hasMany(TestimonialsReviews, { foreignKey: 'user_id', as: 'testimonials_reviews' });

module.exports = TestimonialsReviews;
