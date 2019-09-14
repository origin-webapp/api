import {  PrimaryKey, AutoIncrement, Column, DataType, Table, Model, HasOne, HasMany, AllowNull } from 'sequelize-typescript';
import CharacterStats from './character-stats.model';
import Power from './power.model';


@Table({schema: process.env.ORIGIN_DB_SCHEMA})
export default class Character extends Model<Character> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @Column
  public creator: string; // email of the person who this character belongs to

  @Column
  public well_multiplier: number;

  @Column
  public karma: number;

  @HasOne(() => CharacterStats)
  public stats: CharacterStats;

  @HasMany(() => Power)
  public powers: Power[];

}