import Review, {ReviewDocument} from '../models/reviewModel'


//Thinking of adding extra get services for reviews
const create = async (review: ReviewDocument): Promise<ReviewDocument> => {
    return review.save()
}