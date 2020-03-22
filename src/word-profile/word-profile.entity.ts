import {Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm'

@Entity('word-profile')
export class WordProfile {
  @ObjectIdColumn() id: ObjectID
  @Column() word: string
  // @Column() animalType: string
  // @Column() pictureUrl?: string
  // @Column() birthDate?: Date

  constructor(wordProfile?: Partial<WordProfile>) {
    Object.assign(this, wordProfile)
  }
}
