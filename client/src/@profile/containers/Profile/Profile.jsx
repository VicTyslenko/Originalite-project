import { clearCart } from "@main/store/slices/cartSlice";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { clearDataAuth } from "../../../@main/store/slices/authSlice";
import { clearDataRegister } from "../../../@main/store/slices/registrationSlice";
import { useUserData } from "../../hooks/useUserData";
import * as S from "./StyledUserProfile";

function Profile() {
	const dispatch = useDispatch();
	const user = useUserData();

	const clearData = () => {
		dispatch(clearDataAuth());
		dispatch(clearDataRegister());
		dispatch(clearCart());
	};

	return (
		<Container maxWidth="lg" sx={{ mt: "150px", mb: "100px" }}>
			<Typography variant="h3" sx={{ mb: "141px" }}>
				Welcome, {`${user?.firstName} ${user?.lastName}`}
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<S.StyledLink to="myAccount">
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
					<S.StyledLink to="tab-purchase">
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
					<S.StyledLink to="tab-wish">
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
					<S.StyledLink to="tab-address">
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
					<S.StyledLink to="/" onClick={() => clearData()}>
						<S.FlexWrapp>
							<ExitToAppIcon fontSize="large" />
							<div className="content">
								<p className="title">Sign out</p>

								<p className="description">Sign out</p>
							</div>
						</S.FlexWrapp>
					</S.StyledLink>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Profile;
