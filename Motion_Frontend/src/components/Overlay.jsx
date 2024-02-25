import {
OverlayBackground,
OverlayContainer,
OverlayControls,
OverlayClose,
PostOverlayGrid,
PostOverlayContent,
FlexDivColumn,
FlexDiv,
PostTimestamp,
LikeButton,
PostDropDown,
StyledMenuIcon,
StyledPost,
SharedPost,
NewPostForm,
StyledInput,
PostButton,
} from '../Styles/PostStyles.js'
import blankAvatar from '../motion-assets/images/users/blank_avatar.jpeg'
import MenuIcon from '../motion-assets/svgs/menu.svg'
import Heart from '../motion-assets/svgs/heart.svg'
import Share from '../motion-assets/svgs/share.svg'
import SendButton from '../motion-assets/svgs/SendButton.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function Overlay({ children, show, post, sharedPost, postToEdit, toggleEdit, toggleLike, deletePost, sharePost, editPost }) {

	const userAvatar = localStorage.getItem("avatar");
	const [showDropDown, setShowDropDown] = useState(false)
	const [content, setContent] = useState('')
	const [postToEditValue, setPostToEditValue] = useState(postToEdit ? postToEdit.content : '')
	

	function handleDeletePost() {
		show(false)
		deletePost(post.id)
	}
	
	function handleSharePost(event) {
		event.preventDefault()
		show(false)
		sharePost(sharedPost.id, content)
	}

	
	return (
		<div>
			<OverlayBackground onClick={() => show(false)}/>
			<OverlayContainer>
				{children}
				{post && <PostOverlayGrid>
					{post.images[0] && <img src={post.images[0].image} height='100%'/>}
					<PostOverlayContent>
						<div>
						<FlexDiv>
							<FlexDiv>
								{!post.user.avatar && <img src={blankAvatar} width='40px' height='40px'/>}
								{post.user.avatar && <img src={post.user.avatar} width='40px' height='40px'/>}
								<FlexDivColumn>
									<p>{post.user.first_name} {post.user.last_name}</p>
									<PostTimestamp>{new Date(post.created).toLocaleDateString()}</PostTimestamp>
								</FlexDivColumn>
							</FlexDiv>
							{!showDropDown && <StyledMenuIcon src={MenuIcon} onClick={() => setShowDropDown(true)}/>}
							{showDropDown && <PostDropDown>
								<button onClick={() => toggleEdit(postToEdit)}>Edit</button>
								<button onClick={handleDeletePost}>Delete</button>
							</PostDropDown>}
						</FlexDiv>
						<div onClick={() => setShowDropDown(false)} >
							{post.content}
							<div>{post.shared &&
								<SharedPost
									key={post.id}
									>
									<FlexDiv>
										<FlexDiv>
											{!post.shared.user.avatar && <img src={blankAvatar} width='40px' height='40px'/>}
											{post.shared.user.avatar && <img src={post.shared.user.avatar} width='40px' height='40px'/>}
											<FlexDivColumn>
												<p>{post.shared.user.first_name} {post.shared.user.last_name}</p>
												<PostTimestamp>{new Date(post.shared.created).toLocaleDateString()}</PostTimestamp>
											</FlexDivColumn>
										</FlexDiv>
										<img src={MenuIcon} />
									</FlexDiv>
									<div onClick={() => handleShowPost(post)}>
										<div>{post.shared.content}</div>
										{post.shared.images.length > 0 ? <div>{post.shared.images.map((i) =>
											<img key={i.id} src={i.image} width='300px'/>)} </div> : ''}
									</div>
									<LikeButton>
										<div>
											<button onClick={() => toggleLike(post)}>
												<img src={Heart} />
												<p>Like</p>
											</button>
											<button>
												<img src={Share} />
												<p>Share</p>
											</button>
										</div>
										<p>{post.shared.amount_of_likes == 1 ? `1 like` : `${post.amount_of_likes} likes`}</p>
									</LikeButton>
								</SharedPost>
							}</div>
							</div>
						</div>
						<LikeButton>
							<div>
								<button onClick={() => toggleLike(post)}>
									<img src={Heart} />
									<p>Like</p>
								</button>
								<button>
									<img src={Share} />
									<p>Share</p>
								</button>
							</div>
							<p>{post.amount_of_likes == 1 ? `1 like` : `${post.amount_of_likes} likes`}</p>
						</LikeButton>
					</PostOverlayContent>
				</PostOverlayGrid>}
				{sharedPost &&
					<StyledPost>
						<NewPostForm onSubmit={handleSharePost}>
							<FlexDiv>
								<img src={userAvatar} width='40px' height='40px'/>
								<StyledInput
									onChange={(event) => setContent(event.target.value)}
									placeholder={`What's on your mind?`}
									autoFocus/>
								<PostButton><img src={SendButton}/></PostButton>
							</FlexDiv>
								<SharedPost
									key={sharedPost.id}
									>
									<FlexDiv>
										<FlexDiv>
											{!sharedPost.user.avatar && <img src={blankAvatar} width='40px' height='40px'/>}
											{sharedPost.user.avatar && <img src={sharedPost.user.avatar} width='40px' height='40px'/>}
											<FlexDivColumn>
												<p>{sharedPost.user.first_name} {sharedPost.user.last_name}</p>
												<PostTimestamp>{new Date(sharedPost.created).toLocaleDateString()}</PostTimestamp>
											</FlexDivColumn>
										</FlexDiv>
										<img src={MenuIcon} />
									</FlexDiv>
									<div onClick={() => handleShowPost(sharedPost)}>
										<div>{sharedPost.content}</div>
										{sharedPost.images.length > 0 ? <div>{sharedPost.images.map((i) =>
											<img key={i.id} src={i.image} width='300px'/>)} </div> : ''}
									</div>
									<LikeButton>
										<div>
											<button onClick={() => toggleLike(sharedPost)}>
												<img src={Heart} />
												<p>Like</p>
											</button>
											<button onClick={() => sharePost(sharedPost.id)}>
												<img src={Share} />
												<p>Share</p>
											</button>
										</div>
										<p>{sharedPost.amount_of_likes == 1 ? `1 like` : `${sharedPost.amount_of_likes} likes`}</p>
									</LikeButton>
								</SharedPost>
						</NewPostForm>
					</StyledPost>
				}
				{postToEdit &&
					<StyledPost>
						<NewPostForm onSubmit={() => {
							event.preventDefault()
							show(false)
						}}>
							<FlexDiv>
								<img src={userAvatar} width='40px' height='40px'/>
								<StyledInput
									onChange={(event) => setPostToEditValue(event.target.value)}
									value={postToEditValue}
									autoFocus/>
								<PostButton><img src={SendButton}/></PostButton>
							</FlexDiv>
						</NewPostForm>
					</StyledPost>
				}
			</OverlayContainer>
		</div>
	)
}