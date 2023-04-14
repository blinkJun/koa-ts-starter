import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import config from '../../config/index'

const basename = path.basename(__filename)
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql);
interface DB {
  [propName:string]:any
}
const db:DB = {
    sequelize: sequelize,
    Sequelize: Sequelize,
};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach(file => {
        const model = (sequelize as any)['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


export default db
