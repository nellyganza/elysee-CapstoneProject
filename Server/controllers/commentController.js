import { pick } from 'lodash'
import Comment from '../models/comment'

export default new class commentController {
	async save(req, res) {
		try {
			const data = pick(req.body, ['fullName', 'comment'])
			const comment = new Comment({ ...data, blog: req.params.id })
			await comment.save()
			return res.status(200).send({
				message: 'Comment Sent Succesful',
				comment
			})
		} catch (error) {
			return res.status(400).send({
				message: 'Comment not sent',
				error: error.message
			})
		}
	}

	async getAll(req, res) {
		const comments = await Comment.find({ blog: req.params.id })
		return res.status(200).send({
			message: 'Comment found !!',
			data: comments
		})
	}
}()
