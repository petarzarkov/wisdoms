import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tblWisdoms", timestamps: false })
export class TblWisdoms extends Model {

    @PrimaryKey
    @Column({ allowNull: false, type: DataType.SMALLINT })
    public id: number;

    @Column({ allowNull: false, type: DataType.STRING(32) })
    public name: string;

    @Column({ allowNull: false, type: DataType.STRING(264) })
    public joke: string;

    @Column({ allowNull: false, type: DataType.STRING(32) })
    public lang: string;

    @Column({ allowNull: false, type: DataType.JSONB, defaultValue: {} })
    public params: Record<string, unknown>;


}

export default TblWisdoms;