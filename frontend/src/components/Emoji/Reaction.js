import EmojiWithCounter from "./EmojiWithCounter";
import EmojiAdder from "./EmojiAdder";
import { useState, useEffect, useContext } from "react";
import { ReactionsContext } from "../Comments/AllComments";
import { DEFAULT_EMOJI_OPTIONS } from "../../lib/emojiConfig";

let dbDebouncerTimer;
export default function Reaction({ commentId }) {
	// We get the initial reactions we previously fetched from the Context
	const contextReactions = useContext(ReactionsContext)
		?.filter(r => r.commentId === commentId)
		.map(r => r.reactions)
		?.sort((a, b) => (a.counter < b.counter ? 1 : -1))[0];
	const [reactions, setReactions] = useState([]);
	const [shouldUpdateDb, setShouldUpdateDb] = useState(false);

	useEffect(() => {
	    async function loadReactions() {
	        // If there are reactions in the context, set them
			if (contextReactions) setReactions(contextReactions);

			const request = await fetch("http://localhost:4000/comments/getReactions/" + commentId);
		    const json = await request.json()

		    setReactions(json.reactions);
		}

	    //invoke the function
	    loadReactions();
	  }, []);

	useEffect(() => {
		if (shouldUpdateDb) updateReactionsOnDatabase();
		setShouldUpdateDb(false);
	}, [shouldUpdateDb]);

	// Onclick, update the emoji counter and start a timer to update the database
	const updateEmojiCount = emoji => {
		setShouldUpdateDb(false);
		let emojiFromState = reactions.filter(em => em.emoji === emoji)[0];
		if (!emojiFromState) {
			emojiFromState = DEFAULT_EMOJI_OPTIONS.filter(
				em => em.emoji === emoji
			)[0];
			emojiFromState.counter = 1;
			setReactions(reactions =>
				[...reactions, emojiFromState].sort((a, b) =>
					a.counter < b.counter ? 1 : -1
				)
			);
		} else {
			emojiFromState.counter++;
			setReactions(reactions =>
				[
					...reactions.filter(
						rea => rea.emoji !== emojiFromState.emoji
					),
					emojiFromState,
				].sort((a, b) => (a.counter < b.counter ? 1 : -1))
			);
		}
		setShouldUpdateDb(true);
	};

	// Debouncer to avoid updating the database on every click
	function updateReactionsOnDatabase() {
		clearTimeout(dbDebouncerTimer);
		dbDebouncerTimer = setTimeout(() => {
			// stringReactions = JSON.stringify({"reactions" : reactions});
			fetch("http://localhost:4000/comments/addReaction/" + commentId, {
				method: "POST",
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					"reactions": reactions,
				}),
			});
			dbDebouncerTimer = null;
		}, 1000 * 1);
	}

	const mappedReactions = (reactions) ? reactions.map(reaction => (
		<EmojiWithCounter
			emoji={reaction.emoji}
			emojiLabel={reaction.label}
			initialCounter={reaction.counter}
			onIncrease={updateEmojiCount}
		/>
	)) : [];

	return (
		<div className="reaction-block">
			{mappedReactions}
			<EmojiAdder
				selectedEmojis={reactions}
				updateEmojiCount={updateEmojiCount}
				EMOJI_OPTIONS={DEFAULT_EMOJI_OPTIONS}
			/>
		</div>
	);
}