import { clearCart } from "@main/store/slices/cartSlice";
import { clearTempAuth } from "@main/store/slices/tempAuthSlice";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Container, Grid, Typography } from "@mui/material";
import { useUserData } from "hooks/use-user-data";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearDataAuth } from "../../../@main/store/slices/auth/authSlice";
import * as S from "./StyledUserProfile";

function Profile() {
	const dispatch = useDispatch();

	const user = useUserData();

	const navigate = useNavigate();

	const clearData = () => {
		dispatch(clearDataAuth());

		dispatch(clearTempAuth());
		dispatch(clearCart());
	};

	const handleLogout = () => {
		clearData();

		localStorage.removeItem("persist:auth");
		sessionStorage.removeItem("persist:tempAuth");

		navigate("/");
	};

	return (
		<Container maxWidth="lg" sx={{ mt: "150px", mb: "100px" }}>
			<Typography variant="h3" sx={{ mb: "141px" }}>
				Welcome, {`${user?.firstName} ${user?.lastName}`}
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<S.StyledLink to="/account/my-account?tab=my-profile">
						<S.FlexWrapp>
							<PersonOutlineIcon fontSize="large" />
							<div className="content">
								<p className="title">My profile</p>
								<p className="description">Show and update your personal information</p>
							</div>
						</S.FlexWrapp>
					</S.StyledLink>
				</Grid>
				<Grid item xs={6}>
					<S.StyledLink to="/account/my-account?tab=purchase-history">
						<S.FlexWrapp>
							<ShoppingBasketOutlinedIcon fontSize="large" />
							<div className="content">
								<p className="title">Purchase history</p>
								<p className="description">Show and update your personal information</p>
							</div>
						</S.FlexWrapp>
					</S.StyledLink>
				</Grid>
				<Grid item xs={6}>
					<S.StyledLink to="/account/my-account?tab=wishlist">
						<S.FlexWrapp>
							<FavoriteBorderIcon fontSize="large" />
							<div className="content">
								<p className="title">My wishlist</p>

								<p className="description">Show and update your personal information</p>
							</div>
						</S.FlexWrapp>
					</S.StyledLink>
				</Grid>
				<Grid item xs={6}>
					<S.StyledLink to="/account/my-account?tab=address-book">
						<S.FlexWrapp>
							<ArticleOutlinedIcon fontSize="large" />
							<div className="content">
								<p className="title">Address book</p>

								<p className="description">Show and update your personal information</p>
							</div>
						</S.FlexWrapp>
					</S.StyledLink>
				</Grid>
				{user?.isAdmin && (
					<Grid item xs={6}>
						<S.StyledLink to="/editor/dashboard">
							<S.FlexWrapp>
								<EditOutlinedIcon fontSize="large" />
								<div className="content">
									<p className="title">Edit</p>

									<p className="description">Edit</p>
								</div>
							</S.FlexWrapp>
						</S.StyledLink>
					</Grid>
				)}
				<Grid item xs={6}>
					<S.StyledButton onClick={() => handleLogout()}>
						<S.FlexWrapp>
							<ExitToAppIcon fontSize="large" />
							<div className="content">
								<p className="title">Sign out</p>

								<p className="description">Sign out</p>
							</div>
						</S.FlexWrapp>
					</S.StyledButton>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Profile;
