import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'

export const Rating = sequelize.define("Rating", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
})
