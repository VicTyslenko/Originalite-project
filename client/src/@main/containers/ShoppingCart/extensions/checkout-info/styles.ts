import styled from "styled-components";

export const Wrapper = styled.div`
  width: 362px;
  background: #c4c4c4;
  height: fit-content;
  padding: 40px;
`;

export const Title = styled.h1`
  color: black;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  font-family: "Open Sans";
  text-transform: uppercase;
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 12px;

  text-transform: uppercase;
`;

export const Line = styled.hr`
  margin-top: 77px;
  margin-bottom: 50px;
  height: 1px;
  background: grey;
  border: none;
`;
export const OrderValue = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  font-family: "Josefin Sans";
  text-transform: uppercase;
  margin-bottom: 30px;
`;

export const Delivery = styled.p`
  color: #002068;
  font-weight: 600;
`;
type TotalProps = {
  isActive: boolean;
};

export const Total = styled.p<TotalProps>`
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  font-family: "Open Sans";
  margin-bottom: 10px;

  color: ${({ isActive }) => (isActive ? "green" : "black")};

  & .total-price {
    font-size: 18px;
    line-height: 14px;
    margin-left: 1rem;
    color: black;
  }
`;

export const ButtonWrapp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputWrapp = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  & .default-button {
    background-color: inherit;
    padding: 0;
    min-width: unset;
    font-weight: 400;
    font-size: 12px;
    font-family: "Open Sans";
    text-transform: uppercase;
    color: #002068;
  }
`;

export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

