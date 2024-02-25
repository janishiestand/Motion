import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Overlay from '../../components/Overlay.jsx'
import {
FeedGrid,
PhotosGrid,
StyledInput,
FlexDiv,
FlexDivCentered,
FlexDivColumn,
StyledPost,
SharedPost,
PostTimestamp,
FeedLayout,
LikeButton,
PostButton,
PostDropDown,
ImageIconButton,
StyledMenuIcon,
NewPostForm,
PostContent
} from '../../Styles/PostStyles.js'
import Alber from '../../motion-assets/images/users/alber.png'
import blankAvatar from '../../motion-assets/images/users/blank_avatar.jpeg'
import SendButton from '../../motion-assets/svgs/SendButton.png'
import ImageIcon from '../../motion-assets/svgs/icon-image.svg'
import MenuIcon from '../../motion-assets/svgs/menu.svg'
import Heart from '../../motion-assets/svgs/heart.svg'
import Share from '../../motion-assets/svgs/share.svg'
import { useSelector } from 'react-redux'


export default function Feed() {

	const api = axios.create({baseURL:'https://motion.propulsion-home.ch/backend/api/'})
	const token = localStorage.getItem('accessToken')
	const userAvatar = localStorage.getItem("avatar")
	
	const uploadImageInput = useRef(null)

	const { filterID } = useParams()
	const [postsLeft, setPostsLeft] = useState([])
	const [postsRight, setPostsRight] = useState([])
	const [newPostContent, setNewPostContent] = useState('')
	
	const [showNewPostOverlay, setShowNewPostOverlay] = useState(false)
	const [showPostOverlay, setShowPostOverlay] = useState(false)
	const [overlayPost, setOverlayPost] = useState({})
	const [showSharedPostOverlay, setShowSharedPostOverlay] = useState(false)
	const [sharedPost, setSharedPost] = useState({})
	const [showEditPostOverlay, setShowEditPostOverlay] = useState(false)
	const [postToEdit, setPostToEdit] = useState({})
	
	const [imagePreview, setImagePreview] = useState(null)
	const [oneImage, setOneImage] = useState(null)
	const [showDropDown, setShowDropDown] = useState(false)
	
	
	async function fetchPosts(offset) {
		
		let postFilter = ''
		if (filterID == 'liked') postFilter = 'likes/'
		else if (filterID == 'friends') postFilter = 'friends/'
		else if (filterID == 'following') postFilter = 'following/'
				
		try {
			const response = await api.get(`social/posts/${postFilter}?offset=${offset}`, {
				headers: {Authorization: `Bearer ${token}`}
			})
			sortPosts(response.data.results)
		}
		catch(error) {
			console.log(`Fetch Posts Error: ${error.message}`)
		}
	}
	
	function sortPosts(posts) {
		let evenPosts = []
		let oddPosts = []
		posts.forEach((post) => {
			if (posts.indexOf(post) % 2 == 0) {
				evenPosts.push(post)
			}
			else oddPosts.push(post)
		})
		setPostsRight([...evenPosts])
		setPostsLeft([...oddPosts])
	}
	
	async function createNewPost() {
		
		event.preventDefault()
		event.target.reset()
		
		if (newPostContent.length > 0) {
		
			const formData = new FormData()
			formData.append('content', newPostContent)
			if (oneImage) formData.append('images', oneImage)
			
			try {
				const response = await api.post(`social/posts/`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					},
				})
				fetchPosts()
				setShowNewPostOverlay(false)
				console.log('new post created')
			}
			catch(error) {
				console.log(error.message)
//				console.log(token)
			}
		}
	}
	
	function resetNewPostForm() {
		setNewPostContent('')
		setOneImage(null)
		setImagePreview(null)
		setShowNewPostOverlay(true)
	}
	
	async function deletePost(postID) {
		
		try {
			const response = await api.delete(`social/posts/${postID}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			fetchPosts()
//			console.log(`Post ${postID} deleted`)
		}
		catch(error) {
			console.log(`delete error: ${error.message}`)
		}
	}
	
	async function sharePost(postID, postContent) {
			const formData = new FormData()
			formData.append('shared', postID)
			formData.append('content', postContent)
		try {
			const response = await api.post(`social/posts/`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			})
			fetchPosts()
		}
		catch(error) {
			console.log(`share error: ${error.message}`)
		}
	}
	
	async function toggleLike(postObject) {
		setShowPostOverlay(false)
		try {
			const response = await api.post(`social/posts/toggle-like/${postObject.id}/`, {Post: postObject}, {
					headers: {Authorization: `Bearer ${token}`},
				})
			fetchPosts()
		}
		catch(error) {
			console.log(error.message)
			console.log(token)
		}
	}
	
    const uploadImage = (event) => {
    	if (event) {
    		setImagePreview(URL.createObjectURL(event.target.files[0]))
    		setOneImage(event.target.files[0])
    	}
    }
    
    async function editPost(post, postContent) {
    	event.preventDefault()
    	
		const formData = new FormData()
		formData.append('content', postContent)
    	
    	try {
    		const response = await api.patch(`social/posts/${post.id}`, formData, {
    			headers: {
    				Authorization: `Bearer ${token}`
    			}
    		})
    		fetchPosts()
    		console.log('edit successfull')
    	}
    	catch(error) {
    		console.log(error.message)
    	}
    }
    
    function handleEditPost(post) {
    	setPostToEdit(post)
    	setShowEditPostOverlay(true)
    	setShowDropDown(false)
    	setShowPostOverlay(false)
    }
    
	function handleDeletePost(post) {
		setShowDropDown(false)
		deletePost(post.id)
	}
    
    function handleShowPost(post) {
    	setShowPostOverlay(!showPostOverlay)
    	setShowDropDown(false)
    	setOverlayPost(post)
    }
    
    function handleShowSharedPost(post) {
    	setSharedPost(post)
    	setShowSharedPostOverlay(true)
    }

	
	useEffect(() => {
		fetchPosts(0)
	},[filterID])
	
	return (
		<>
		
		<FeedLayout>
			<FeedGrid>
				{showSharedPostOverlay &&
					<Overlay
						show={setShowSharedPostOverlay}
						sharedPost={sharedPost}
						sharePost={sharePost}
					/>
				}
				{showNewPostOverlay && <Overlay
					show={setShowNewPostOverlay}>
					<StyledPost>
						<NewPostForm onSubmit={createNewPost}>
							<FlexDiv>
								<img src={userAvatar} width='40px' height='40px'/>
								<StyledInput
									onChange={(event) => setNewPostContent(event.target.value)}
									placeholder={`What's on your mind?`}
									autoFocus/>
							</FlexDiv>
							<PhotosGrid>
								{imagePreview && <img src={imagePreview} height='400px'/>}
							</PhotosGrid>
							<FlexDiv>
								<ImageIconButton>
									<img src={ImageIcon}/>
									<input
										ref={uploadImageInput}
										onChange={uploadImage}
										type='file'
										multiple/>
								</ImageIconButton>
								<PostButton type='submit'><img src={SendButton}/></PostButton>
							</FlexDiv>
						</NewPostForm>
					</StyledPost>
				</Overlay>}
				<StyledPost onClick={resetNewPostForm}>
					<FlexDiv>
						<img src={userAvatar} width='40px' height='40px'/>
						<StyledInput placeholder={`What's on your mind?`}/>
						<PostButton><img src={SendButton}/></PostButton>
					</FlexDiv>
				</StyledPost>
				{showEditPostOverlay && <Overlay
					show={setShowEditPostOverlay}
					postToEdit={postToEdit}
					editPost={editPost} />
				}
				{showPostOverlay && <Overlay
					show={setShowPostOverlay}
					post={overlayPost}
					toggleLike={toggleLike}
					toggleEdit={handleEditPost}
					deletePost={deletePost} />}
				{postsLeft.map((post) =>
					<StyledPost
						key={post.id}
						>
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
								<button onClick={() => handleEditPost(post)}>Edit</button>
								<button onClick={() => handleDeletePost(post)}>Delete</button>
								<button onClick={() => setShowDropDown(false)}>Close</button>
							</PostDropDown>}
						</FlexDiv>
						<div onClick={() => {
							handleShowPost(post)
							setShowDropDown(false)
						}}>
							<PostContent>{post.content}</PostContent>
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
										<StyledMenuIcon src={MenuIcon} />
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
							{post.images.length > 0 ? <div>{post.images.map((i) =>
								<img key={i.id} src={i.image} width='300px'/>)} </div> : ''}
						</div>
						<LikeButton>
							<div>
								<button onClick={() => toggleLike(post)}>
									<img src={Heart} />
									<p>Like</p>
								</button>
								<button onClick={() => handleShowSharedPost(post)}>
									<img src={Share} />
									<p>Share</p>
								</button>
							</div>
							<p>{post.amount_of_likes == 1 ? `1 like` : `${post.amount_of_likes} likes`}</p>
						</LikeButton>
					</StyledPost>
					)}
				
			</FeedGrid>
			<FeedGrid>
				{postsRight.map((post) =>
					<StyledPost key={post.id}>
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
								<button onClick={() => handleEditPost(post)}>Edit</button>
								<button onClick={() => handleDeletePost(post)}>Delete</button>
								<button onClick={() => setShowDropDown(false)}>Close</button>
							</PostDropDown>}
						</FlexDiv>
						<div onClick={() => handleShowPost(post)}>
							<PostContent>{post.content}</PostContent>
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
										<StyledMenuIcon src={MenuIcon} />
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
											<button onClick={() => handleShowSharedPost(post)}>
												<img src={Share} />
												<p>Share</p>
											</button>
										</div>
										<p>{post.shared.amount_of_likes == 1 ? `1 like` : `${post.amount_of_likes} likes`}</p>
									</LikeButton>
								</SharedPost>
							}</div>
							{post.images.length > 0 ? <div>{post.images.map((i) =>
								<img key={i.id} src={i.image} width='300px'/>)} </div> : ''}
						</div>
						<LikeButton>
							<div>
								<button onClick={() => toggleLike(post)}>
									<img src={Heart} />
									<p>Like</p>
								</button>
								<button onClick={() => handleShowSharedPost(post)}>
									<img src={Share} />
									<p>Share</p>
								</button>
							</div>
							<p>{post.amount_of_likes == 1 ? `1 like` : `${post.amount_of_likes} likes`}</p>
						</LikeButton>
					</StyledPost>
					)}
				<button onClick={() => fetchPosts(postsRight.length + postsLeft.length)}>more posts</button>
			</FeedGrid>
		</FeedLayout>
		</>
	)
}