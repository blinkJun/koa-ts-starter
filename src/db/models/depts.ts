import { Sequelize, Model } from 'sequelize';
import { baseFileds } from '../migrations/create-depts'

class Depts extends Model {
  declare id: number;
  declare name: string;
  declare parent_id: number;
  declare created_at: number;
  declare updated_at: number;
}

export const tableName = 'depts'

export default (sequelize: Sequelize): typeof Depts => {
    Depts.init(
        {
            ...baseFileds
        },
        {
            tableName: tableName,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            sequelize, // passing the `sequelize` instance is required
        },
    );
    return Depts
}