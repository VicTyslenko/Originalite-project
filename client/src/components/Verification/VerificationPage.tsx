import * as S from "./styles";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "services/api/verifyEmail";

const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [serverMessage, setServerMessage] = useState<string>("");

  const token = searchParams.get("token");

  useEffect(() => {
    (async function () {
      try {
        if (token) {
          await verifyEmail({ token });
        }
      } catch (error: any) {
        console.error(error);
        setServerMessage(error.response.data.message);
      }
    })();

    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      navigate("/login-form", {
        state: {
          verified: true,
        },
      });

      toast.success("Email verified successfully!");
    }, 2000);

    return () => clearTimeout(timer);
  }, [token, navigate, serverMessage]);

  return (
    <>
      <S.Wrapper>{serverMessage ? `${serverMessage}, you can login!` : "Verifying your email..."}</S.Wrapper>
    </>
  );
};

export default VerificationPage;
