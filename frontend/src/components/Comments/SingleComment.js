import Reaction from "../Emoji/Reaction";

export default function Comment({ comment }) {
	return (
		<li
			key={comment.id}
			id={comment.id}
		>
			<span className="comment-info-container">
				<span className="comment-info">
					Comment by <strong>{comment.name}</strong>
				</span>
			</span>
			<p
				className="comment-content"
				dangerouslySetInnerHTML={{
					__html: comment.comment.trim(),
				}}
			></p>
			<div className="reaction-div">
				<Reaction commentId={comment.id} />
			</div>
		</li>
	);
}
