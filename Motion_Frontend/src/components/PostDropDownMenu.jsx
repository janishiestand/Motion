import {
OverlayBackground,
OverlayContainer,
OverlayControls,
OverlayClose,
} from '../Styles/PostStyles.js'


export default function Overlay({ children, show, post}) {


	
	return (
		<div>
			<OverlayBackground onClick={() => show(false)}/>
			<OverlayContainer>
				{children}
			</OverlayContainer>
		</div>
	)
}