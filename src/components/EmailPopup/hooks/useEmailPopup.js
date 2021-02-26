/**
 * Use email popup hook
 */

import { useDispatch } from "react-redux";
import { openEmailPopup } from "../actions";

/**
 * Hook to allow email popup to be opened by any other component
 * (as long as it is mounted somewhere in the tree)
 *
 * @returns func A wrapper around the open report dispatch
 */
export const useEmailPopup = () => {
  const dispatch = useDispatch();

  return (popupOptions, data) => {
    dispatch(openEmailPopup(popupOptions, data));
  };
};
