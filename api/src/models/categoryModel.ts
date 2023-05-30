import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface CategoryDocument extends Document {
  name: string
  image: string
  // This is to ensure only admins can create, update, delete categories
  creator: ObjectId
}

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please, add name of category"],
  },
  image: {
    type: String,
    required: [true, "Please, add a link to the image of category"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
})

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema)
export default Category