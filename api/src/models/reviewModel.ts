import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ReviewDocument extends Document {
  user: ObjectId
  productId: ObjectId
  rate: 1 | 2 | 3 | 4 | 5
  text: string
}

const ReviewSchema = new Schema<ReviewDocument>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  rate: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, 'Please, add your rate value'],
  },
  text: {
    type: String,
  }
},
{
    // Creates 'updated at' and 'created at' fields automatically
    timestamps: true
})
  
const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema)
export default Review