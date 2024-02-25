import searchIcon from '../../motion-assets/svgs/search_icon.svg'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import {
PostsSearchBar,
FlexDivCentered,
StyledInput,
FlexDivColumn,
PostsLayout
} from '../../Styles/PostStyles.js'



export default function Posts() {

	const navigate = useNavigate()

    useEffect(() => {
        navigate('all')
    },[])
	
	
	return (
	    <PostsLayout>
            <PostsSearchBar>
                <FlexDivCentered>
                    <img src={searchIcon} alt="search icon"/>
                    <StyledInput type="text" placeholder="Search Posts..."/>
                </FlexDivCentered>
                <FlexDivCentered>
                    <NavLink to='all' >All</NavLink>
                    <NavLink to='liked' >Liked</NavLink>
                    <NavLink to='friends' >Friends</NavLink>
                    <NavLink to='following' >Following</NavLink>
                </FlexDivCentered>
            </PostsSearchBar>
            <Outlet />
        </PostsLayout>
	)
}