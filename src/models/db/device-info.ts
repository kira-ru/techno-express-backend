import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'

export const DeviceInfo = sequelize.define("DeviceInfo", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description:{type: DataTypes.STRING, allowNull: false},
})


