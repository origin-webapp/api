import {  PrimaryKey, AutoIncrement, Column, DataType, Table, Model, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import PowerMechanic from './power-mechanic.model';
import Character from './character.model';


@Table({schema: process.env.ORIGIN_DB_SCHEMA})
export default class Power extends Model<Power> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column
  public name: string;

  @Column
  public rank: number;

  @ForeignKey(() => PowerMechanic)
  @Column
  public mechanicId: number;

  @BelongsTo(() => PowerMechanic)
  public mechanic: PowerMechanic;


  @AllowNull(false)
  @ForeignKey(() => Character)
  @Column
  public characterId: number;

  @BelongsTo(() => Character)
  public character: Character;

  // constructor(id = 0, name = '', rank = 0, mechanic?: PowerMechanic) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.rank = rank;
  //   this.mechanic = mechanic ? mechanic : new PowerMechanic();
  // }
}