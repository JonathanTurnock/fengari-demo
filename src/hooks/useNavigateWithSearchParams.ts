import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigateWithSearchParams = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();

  return (pathname: string) => nav({ pathname, search: params.toString() });
};
