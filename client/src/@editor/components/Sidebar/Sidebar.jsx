import { SidebarWrapp, StyledLink, ButtonWrap } from './StyledSideBar';

function Sidebar() {
	return (
		<SidebarWrapp>
			<ButtonWrap>
				<StyledLink to="/editor/products">products</StyledLink>
			</ButtonWrap>
			<ButtonWrap>
				<StyledLink to="/editor/shop">shop</StyledLink>
			</ButtonWrap>
			<ButtonWrap>
				<StyledLink to="/editor/users">users</StyledLink>
			</ButtonWrap>
			<ButtonWrap>
				<StyledLink to="/editor/style-shop">style-shop</StyledLink>
			</ButtonWrap>
			<ButtonWrap>
				<StyledLink to="/editor/orders">orders</StyledLink>
			</ButtonWrap>
		</SidebarWrapp>
	);
}

export default Sidebar;
