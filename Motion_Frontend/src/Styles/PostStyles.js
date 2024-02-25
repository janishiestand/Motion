import styled from 'styled-components'


export const FlexDivColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
`

export const FlexDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		border-radius: 50px;
	}
`

export const FlexDivCentered = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const FeedLayout = styled.div`
	display: flex;
	gap: 2vw;
`

export const FeedGrid = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	gap: 3vh;
`

export const StyledPost = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	width: 35vw;
	gap: 2vh;
	box-shadow: 0 0 1rem lightgrey;
	
	img {
		border-radius: 50px;
	}
	&:hover {
		box-shadow: 0 0 1rem grey;
	}

`

export const SharedPost = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	margin: 1rem;
	width: 30vw;
	gap: 2vh;
	box-shadow: 0 0 1rem lightgrey;
	border-radius: 20px;
	
	img {
		border-radius: 50px;
	}
`

export const PostContent = styled.p`
	padding: 1rem;
`

export const StyledInput = styled.input`
	border: none;
	border-radius: 20px;
	padding: 1rem;
	margin: 1rem;
	background: none;
`

export const PostTimestamp = styled.p`
	color: grey;
	font-size: small;
`

export const PostsSearchBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid lightgrey;
	width: 80vw;
	margin-bottom: 5vh;
	
	a {
	text-decoration: none;
	padding: 2rem;
	color: black;
	}
	a.active {
    	border-bottom: 1px solid black;
    }

`

export const PostsLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem;
`

export const PostButton = styled.button`
	border: none;
	border-radius: 30px;
	background: none;
	
	img {
		width: 50px;
		height: 50px;
		border-radius: 30px;
		background: rgb(196, 104, 255);
		&:hover {
			box-shadow: 0 0 2px black;
		}
	}
`
export const ImageIconButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: none;
	padding: 0.5vh;
	border-radius: 10px;
	
	&:hover {
		box-shadow: 0 0 5px grey  ;
	}
	input {
//		display: none;
	}
`

export const LikeButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	div {
		display: flex;
		gap: 1rem;
	}
	
	button {
		display: flex;
		gap: 1rem;
		background: none;
		border: none;
		border-radius: 10px;
		padding: 1vh;
		
		&:hover {
			box-shadow: 0 0 5px grey  ;
		}
	}
`

export const StyledMenuIcon = styled.img`
	width: 5px;
	padding: 2vh;
	&:hover {
		box-shadow: 0 0 5px grey  ;
	}
`

export const NewPostForm = styled.form`
	display: grid;
	gap: 1vh;
	
	input {
		width: 80%;
	}
	
`

export const PhotosGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1vh;
`

export const OverlayBackground = styled.div`
	background: rgba(0, 0, 0, 0.5);
	width: 100vw;
	height: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	curser: pointer;
`

export const OverlayContainer = styled.div`
	background-color: white;
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 10;
	width: fit-content;
	height: fit-content;
	transform: translate(-50%, -50%)
`

export const OverlayControls = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items; center;
`

export const OverlayClose = styled.button`
	border: none;
	background-color: transparent;
	font-size: 36px;
	curser: pointer;
	
	&:after {
		display: inline-block;
		content: "\00d7";
	}
`

export const PostOverlayGrid = styled.div`
	display: flex;
	height: 70vh;
//	min-width: 30vw;
`

export const PostOverlayContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1rem;
	min-width: 30vw;
`

export const PostDropDown = styled.div`
	display: flex;
	z-index: 11;
	position: relative;
	gap: 1vh;
	border-radius: 10px;
	
	button {
		border: 1px solid lightgrey;
		border-radius: 20px;
		background: none;
		padding: 1vh;
		
		&:hover {
			box-shadow: 0 0 5px grey;
		}
	}
`