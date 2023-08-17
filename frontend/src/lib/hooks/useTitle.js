import { useEffect } from "react";
import { docConsts } from "../constants/document";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${docConsts.MAIN_TITLE} | ${title}`;
    return () => {
      document.title = `${docConsts.MAIN_TITLE}`;
    };
  }, []);
};

export default useTitle;
