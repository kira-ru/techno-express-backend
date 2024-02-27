import {sequelize} from "@/config/database";
import {DataTypes} from "sequelize";

export const Token = sequelize.define("Tokens", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING},
});
