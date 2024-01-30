import {DataTypes} from 'sequelize'
import {sequelize} from '@/config/database'


export const Brand = sequelize.define("Brand", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})



