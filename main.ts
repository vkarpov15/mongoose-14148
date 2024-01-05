import { OCRSchema } from './word.schema';
import mongoose from 'mongoose';

console.log(mongoose.version);

run().catch(err => console.log(err));

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test');
  const TestModel = mongoose.model('Test', OCRSchema);

  const start = Date.now();
  for (let i = 0; i < 100; ++i) {
    await TestModel.create({
      raw: {
        words: Array(1000).fill(0).map((_, i) => ({
          id: i,
          isVertical: i % 2 === 0,
          text: 'Test ' + i,
          confidence: Math.random()
        }))
      }
    });
  }

  console.log('Average runtime MS', (Date.now() - start) / 100);
}
