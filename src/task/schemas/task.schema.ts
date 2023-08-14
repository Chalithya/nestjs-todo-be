import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
