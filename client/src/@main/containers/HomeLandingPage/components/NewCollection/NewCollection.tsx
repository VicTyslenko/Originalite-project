import { Container } from "@mui/material";

import { ContainerWrapper, GridContainer, GridItem, ImageText, NewInH1, NewInLink } from "./NewCollection.styles";
import { itemData } from "./data.ts";

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
	};
}

function NewCollection() {
	return (
		<ContainerWrapper>
			<Container maxWidth="lg">
				<NewInH1>New</NewInH1>
				<GridContainer>
					{itemData.map(item => (
						<GridItem key={item.img} area={item.area}>
							<NewInLink to={item.path}>
								<img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
								<ImageText>{item.title}</ImageText>
							</NewInLink>
						</GridItem>
					))}
				</GridContainer>
			</Container>
		</ContainerWrapper>
	);
}

export default NewCollection;
