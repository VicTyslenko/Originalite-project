import { useState, Fragment, useEffect } from 'react';
import {
	MainContent,
	ContentForm,
	Header,
	ContainerWrapp,
	ButtonWrap,
	InputItem,
	AddInput,
	ModalBox,
	ModalContent,
} from './StyledEditProducts';
import { Container, Button, MenuItem, Select, InputLabel, FormControl, Modal } from '@mui/material';
import { Formik, FieldArray, Field } from 'formik';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { postProductFetch } from '../../store/actions/newProductActions';

function EditProducts() {
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Container maxWidth="lg">
			<Header>Products</Header>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox>
					<ModalContent>Product successfully added!</ModalContent>
					<ButtonWrap>
						<Button variant="secondary" color="success" onClick={handleClose}>
							Ok
						</Button>
					</ButtonWrap>
				</ModalBox>
			</Modal>

			<ContainerWrapp>
				<ContentForm>
					<Formik
						initialValues={{
							enabled: '',
							male: '',
							name: '',
							currentPrice: '',
							previousPrice: '',
							categories: '',
							imageUrls: [''],
							quantity: '',
							colors: [{ color: '', hash: '' }],
							sizes: [''],
							brand: '',
							manufacturer: '',
							manufacturerCountry: '',
							seller: '',
							productDetails: '',
							productDelivery: '',
						}}
						onSubmit={async (values, onSubmitForm) => {
							const data = await dispatch(postProductFetch(values));
							onSubmitForm.resetForm();
						}}
					>
						{(props) => (
							<MainContent>
								<form className="form" onSubmit={props.handleSubmit}>
									<FormControl size="small" fullWidth sx={{ mb: '20px' }}>
										<InputLabel id="select-enabled">Enabled</InputLabel>
										<Select
											labelId="select-enabled"
											name="enabled"
											size="small"
											value={props.values.enabled}
											label="Enabled"
											onChange={props.handleChange}
										>
											<MenuItem value={true}>Yes</MenuItem>
											<MenuItem value={false}>No</MenuItem>
										</Select>
									</FormControl>
									<FormControl size="small" fullWidth sx={{ mb: '20px' }}>
										<InputLabel id="select-gender">Male</InputLabel>
										<Select
											name="male"
											size="small"
											label="Male"
											value={props.values.male}
											onChange={props.handleChange}
										>
											<MenuItem value="man">Man</MenuItem>
											<MenuItem value="woman">Woman</MenuItem>
											<MenuItem value="accessory">Accessory</MenuItem>
										</Select>
									</FormControl>
									<InputItem
										size="small"
										name="name"
										label="Name"
										type="string"
										value={props.values.name}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="currentPrice"
										label="Current price:"
										type="number"
										value={props.values.currentPrice}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="previousPrice"
										label="Previous price:"
										type="number"
										value={props.values.previousPrice}
										onChange={props.handleChange}
									/>
									<FormControl size="small" fullWidth sx={{ mb: '20px' }}>
										<InputLabel id="demo-select-small">Categories</InputLabel>
										<Select
											labelId="demo-select-small"
											name="categories"
											size="small"
											label="Categories"
											value={props.values.categories}
											onChange={props.handleChange}
										>
											<MenuItem value="jeans">Jeans</MenuItem>
											<MenuItem value="jumpers">Jumpers</MenuItem>
											<MenuItem value="trousers">Trousers</MenuItem>
											<MenuItem value="jackets">Jackets</MenuItem>
											<MenuItem value="coats">Coats</MenuItem>
											<MenuItem value="shirts">Shirts</MenuItem>
											<MenuItem value="t-shirts">T-shirts</MenuItem>
											<MenuItem value="dresses">Dresses</MenuItem>
											<MenuItem value="sunglasses">Sunglasses</MenuItem>
											<MenuItem value="belts">Belts</MenuItem>
											<MenuItem value="bags">Bags</MenuItem>
											<MenuItem value="watches">Watches</MenuItem>
										</Select>
									</FormControl>
									<FieldArray name="imageUrls">
										{(arrayPropsImg) => (
											<>
												<AddInput>
													<AddIcon type="button" onClick={() => arrayPropsImg.push('')} />
												</AddInput>

												{props.values.imageUrls.map((item, index) => (
													<Field name={`imageUrls.${index}`} key={index}>
														{(fieldPropsImg) => (
															<InputItem
																size="small"
																label="Image urls"
																type="string"
																{...fieldPropsImg.field}
															/>
														)}
													</Field>
												))}
											</>
										)}
									</FieldArray>
									<InputItem
										size="small"
										name="quantity"
										label="Quantity:"
										type="number"
										value={props.values.quantity}
										onChange={props.handleChange}
									/>
									<FieldArray name="colors">
										{(arrayProps) => (
											<>
												<AddInput>
													<AddIcon
														type="button"
														onClick={() => arrayProps.push({ color: '', hash: '' })}
													/>
												</AddInput>

												{props.values.colors.map((item, index) => (
													<Fragment key={index}>
														<Field name={`colors.${index}.color`}>
															{(fieldPropsColor) => (
																<InputItem
																	size="small"
																	label="Color"
																	type="string"
																	{...fieldPropsColor.field}
																/>
															)}
														</Field>
														<Field name={`colors.${index}.hash`}>
															{(fieldPropsHash) => (
																<InputItem
																	size="small"
																	label="Hash"
																	type="string"
																	{...fieldPropsHash.field}
																/>
															)}
														</Field>
													</Fragment>
												))}
											</>
										)}
									</FieldArray>
									<FieldArray name="sizes">
										{(arrayProps) => (
											<>
												<AddInput>
													<AddIcon type="button" onClick={() => arrayProps.push('')} />
												</AddInput>

												{props.values.sizes.map((item, index) => (
													<Field name={`sizes.${index}`} key={index}>
														{(fieldProps) => (
															<InputItem
																size="small"
																label="Sizes"
																type="string"
																{...fieldProps.field}
															/>
														)}
													</Field>
												))}
											</>
										)}
									</FieldArray>
									<InputItem
										size="small"
										name="brand"
										label="Brand"
										type="string"
										value={props.values.brand}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="manufacturer"
										label="Manufacturer"
										type="string"
										value={props.values.manufacturer}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="manufacturerCountry"
										label="Manufacturer country"
										type="string"
										value={props.values.manufacturerCountry}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="seller"
										label="Seller"
										type="string"
										value={props.values.seller}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="productDetails"
										label="Product details"
										type="string"
										value={props.values.productDetails}
										onChange={props.handleChange}
									/>
									<InputItem
										size="small"
										name="productDelivery"
										label="Product delivery"
										type="string"
										value={props.values.productDelivery}
										onChange={props.handleChange}
									/>
									<ButtonWrap>
										<Button variant="contained" color="success" type="submit" onClick={handleOpen}>
											Ok
										</Button>
									</ButtonWrap>
								</form>
							</MainContent>
						)}
					</Formik>
				</ContentForm>
			</ContainerWrapp>
		</Container>
	);
}

export default EditProducts;
