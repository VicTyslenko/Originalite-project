import { Container } from "@mui/material";

import {
  CategoryH1,
  CategoryLink,
  ContainerWrapper,
  FlexContainer,
  GridItem,
  ImageText,
  ImageWrap,
} from "./Categories.styles";
import { itemData } from "./data";

function Categories() {
  return (
    <ContainerWrapper>
      <Container maxWidth="lg">
        <CategoryH1>Shop by Category</CategoryH1>
        <FlexContainer>
          {itemData.map(item => (
            <GridItem key={item.img} flex={item.fullWidth}>
              <CategoryLink to={item.path} area={item.area}>
                <img src={item.img} alt={item.title} loading="lazy" />

                <ImageText>{item.title}</ImageText>
              </CategoryLink>
            </GridItem>
          ))}
        </FlexContainer>

        <ImageWrap>
          <CategoryLink to="/store/accessories">
            <img src="https://media.ray-ban.com/cms/resource/image/1225910/portrait_ratio469x528/938/1056/f907175f7c5e4d804216523da5a306f5/0F975D2D4B2F567538BFC7FD5B62C622/rbm-plp-holiday-skyler-d.jpg" />
          </CategoryLink>
        </ImageWrap>
      </Container>
    </ContainerWrapper>
  );
}

export default Categories;
