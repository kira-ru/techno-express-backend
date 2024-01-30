import {sequelize} from '@/config/database'
import {DataTypes} from 'sequelize'

export const User = sequelize.define("User", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.ENUM("USER", "ADMIN"), defaultValue: "USER"}
})


