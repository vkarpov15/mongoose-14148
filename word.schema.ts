import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class RecognizedWord {
  @Prop({ type: Number })
  id!: number

  @Prop({ type: Boolean })
  isVertical!: boolean

  @Prop({ type: String })
  text!: string

  @Prop({ type: Number })
  confidence!: number
}

@Schema({ _id: false })
export class OCRRawResult {

  @Prop({ type: [SchemaFactory.createForClass<RecognizedWord>(RecognizedWord)] })
  words?: RecognizedWord[]

}

export const OCRRawSchema = SchemaFactory.createForClass<OCRRawResult>(OCRRawResult)


@Schema({ collection: 'ocr', shardKey: { _id: 'hashed' } })
export class OCR {
  constructor(init: Partial<OCR>) {
    Object.assign(this, init)
  }

  @Prop({ type: OCRRawSchema })
  raw?: OCRRawResult

}


const exportedSchema = SchemaFactory.createForClass<OCR>(OCR)
exportedSchema.index({ _id: 'hashed' }) // for shard

export const OCRSchema = exportedSchema
