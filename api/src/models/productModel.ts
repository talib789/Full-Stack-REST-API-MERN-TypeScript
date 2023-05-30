import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ProductDocument extends Document {
  title: string
  price: number
  seller: ObjectId
  categories: ObjectId[]
  reviews: ObjectId[]
  images: string[]
}

const ProductSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    images: [
      {
        type: Schema.Types.Array,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

// Gives an error for now, but might not even be needed in future
// ProductSchema.virtual('reviews', {
//   ref: 'reviewModel',
//   localField: '_id',
//   foreignField: 'productId',
// })

const Product = mongoose.model<ProductDocument>('Product', ProductSchema)
export default Product
