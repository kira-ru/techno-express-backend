import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'

export const Basket = sequelize.define("Basket", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

