import {sequelize} from '@/config/database'
import {DataTypes} from 'sequelize'

export const BrandType = sequelize.define('BrandType', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
