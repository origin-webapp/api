import {  PrimaryKey, AutoIncrement, Column, DataType, Table, Model, HasOne, HasMany } from 'sequelize-typescript';
import CharacterStats from './character-stats.model';
import Power from './power.model';


@Table({schema: process.env.ORIGIN_DB_SCHEMA})
export default class Character extends Model<Character> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column
  public name: string;

  @Column
  public creator: string; // email of the person who this character belongs to

  @HasOne(() => CharacterStats)
  public stats: CharacterStats;

  @HasMany(() => Power)
  public powers: Power[];

}