import * as S from "./styles";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "services/api/verifyEmail";

const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    (async function () {
      try {
        if (token) {
          const response = await verifyEmail({ token });
          console.log("response", response.data);

          timer = setTimeout(() => {
            navigate("/login-form", {
              state: {
                verified: true,
              },
            });
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => clearTimeout(timer);
  }, [token, navigate]);

  return (
    <>
      <S.Wrapper>We are verifying your email...</S.Wrapper>
    </>
  );
};

export default VerificationPage;
