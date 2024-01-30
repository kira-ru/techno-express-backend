import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'

export const BasketDevice = sequelize.define('BasketDevice', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
