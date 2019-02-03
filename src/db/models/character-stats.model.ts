import {  PrimaryKey, AutoIncrement, Column, DataType, Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Character from './character.model';


@Table({schema: process.env.ORIGIN_DB_SCHEMA})
export default class CharacterStats extends Model<CharacterStats> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.INTEGER)
  public fighting: number;

  @Column(DataType.INTEGER)
  public agility: number;

  @Column(DataType.INTEGER)
  public dexterity: number;

  @Column(DataType.INTEGER)
  public endurance: number;

  @Column(DataType.INTEGER)
  public strength: number;

  @Column(DataType.INTEGER)
  public reason: number;

  @Column(DataType.INTEGER)
  public intuition: number;

  @Column(DataType.INTEGER)
  public psyche: number;

  @BelongsTo(() => Character)
  public character: Character;

  @ForeignKey(() => Character)
  @Column
  public characterId: number;

  // constructor(id = 0, name = '', rank = 0, mechanic?: PowerMechanic) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.rank = rank;
  //   this.mechanic = mechanic ? mechanic : new PowerMechanic();
  // }
}