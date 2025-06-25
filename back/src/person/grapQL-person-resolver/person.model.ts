import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PersonModel {
  @Field(() => ID)
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  fullName: string;
  @Field()
  gender: string;
  @Field()
  birthDate: Date;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  avatar: string;
}
