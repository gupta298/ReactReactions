import { useState, useEffect, createContext } from "react";
import Comment from "./SingleComment";
import LoadingComponent from "../LoadingComponent";

const ReactionsContext = createContext(undefined);

export default function AllComments() {
	const [comments, setComments] = useState();
	const [reactions, setReactions] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	    async function loadComments() {
	        const request = await fetch("http://localhost:4000/comments");
		    const json = await request.json()
		    
		    setComments(json.comments);
		    setReactions(json.comments.reactions);
		    setIsLoading(false);
		}

	    //invoke the function
	    loadComments();
	  }, []);

	const commentList = comments?.map(comment => {
		return <Comment key={comment.id} comment={comment} />;
	});

	return (
		<ReactionsContext.Provider value={reactions}>
			{isLoading ? <LoadingComponent /> : <ul>{commentList}</ul>}
		</ReactionsContext.Provider>
	);
}

export { ReactionsContext };