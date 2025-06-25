import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  fullName: string;

  @Prop()
  gender: string;

  @Prop()
  birthDate: Date;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;
}

export type PersonType = Person;

export type PersonDocument = Person & Document; // or: HydratedDocument<Person>

export type PersonTypeWithID = Person & { _id: string };

export const PersonSchema = SchemaFactory.createForClass(Person);
