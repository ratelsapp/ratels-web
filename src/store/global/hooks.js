import { useSelector } from "react-redux";
import { useAppSelector } from "store/hooks";

export function useUserLocale() {
  return useSelector((state) => state.global.userLocale);
}

export function useComingSoonState() {
  return useSelector((state) => state.global.comingSoon);
}

export function useAccount() {
  return useAppSelector((state) => state.session.account);
}
