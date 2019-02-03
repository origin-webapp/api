import {  PrimaryKey, AutoIncrement, Column, DataType, Table, NotNull, Model, HasMany } from 'sequelize-typescript';
import Power from './power.model';


@Table({schema: process.env.ORIGIN_DB_SCHEMA})
export default class PowerMechanic extends Model<PowerMechanic> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @NotNull
  @Column
  public name: string;

  @Column
  public description: string;

  @Column(DataType.FLOAT)
  public wellCostMultiplier: number;

  @Column(DataType.FLOAT)
  public healthCostMultiplier: number;

  @Column
  public costScalesWithMaxAbility: boolean;

  @HasMany(() => Power)
  public powers: Power[];

  // constructor(id = 0, name = '', description = '', wellCostMultiplier = 0, healthCostMultiplier = 0, costScalesWithMaxAbility = false) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.description = description;
  //   this.wellCostMultiplier = wellCostMultiplier;
  //   this.healthCostMultiplier = healthCostMultiplier;
  //   this.costScalesWithMaxAbility = costScalesWithMaxAbility;
  // }

}