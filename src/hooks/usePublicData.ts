import { useEffect } from "react";
import { useQueryICPListCallback } from "store/global/hooks";

const usePublicData = () => {
  useEffect(() => {
    queryICPList();
  }, []);

  const queryICPList = useQueryICPListCallback();
};

export default usePublicData;
