import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'

export const DeviceType = sequelize.define("DeviceType", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
