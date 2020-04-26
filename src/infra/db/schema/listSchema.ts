import { Schema } from 'mongoose'

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  wishes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wish',
    },
  ],
}, {
  timestamps: true,
})

export default ListSchema
