/**
 * useData hook
 */
import { useEffect, useState } from "react";

/**
 * Hook which requests data using provided service method and keep it in state.
 *
 * @param {Promise} dataServiceMethod service method which returns data
 * @param  {...any} dataServiceArguments arguments for service method
 *
 * @returns [data, error] tuple with `data` and `error` object
 */
export const useData = (dataServiceMethod, ...dataServiceArguments) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    dataServiceMethod(...dataServiceArguments)
      .then((response) => {
        setData(response.data);
      })
      .catch((responseError) => {
        setError(responseError);
      });
    // disable for the next line, because linter cannot statically verify it, but we know that it's correct
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceMethod, ...dataServiceArguments]);

  return [data, error];
};
