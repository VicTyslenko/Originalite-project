import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ButtonGroup, ItemButton, LinkItem } from "components/Header/StyledHeader";
import { useUserData } from "hooks/use-user-data";

type Props = {
  handleDataSetEvent: (event: React.MouseEvent<HTMLDivElement>) => void;
};


export const ButtonAuthorization = ({ handleDataSetEvent }: Props) => {
  const user = useUserData();

  if (user) {
    return (
      <ButtonGroup>
        <PermIdentityOutlinedIcon sx={{ mr: 0.8 }} fontSize="medium" />
        <LinkItem to="/account/profile">My account</LinkItem>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup data-menu="menuRegistration" onClick={handleDataSetEvent}>
      <PermIdentityOutlinedIcon sx={{ mr: 0.4 }} fontSize="medium" />
      <ItemButton>Sign Up / Log In</ItemButton>
    </ButtonGroup>
  );
};
