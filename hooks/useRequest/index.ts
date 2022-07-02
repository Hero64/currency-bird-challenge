import { useState } from 'react';

import { Options } from './types';

const useRequest = () => {
  const [loading, setLoading] = useState(false);

  const request = async <T = any>(
    url: string,
    options: Options
  ): Promise<T> => {
    const { data, method } = options;
    setLoading(true);

    const response = await fetch(`/api/${url}`, {
      method,
      body: JSON.stringify(data),
    });
    setLoading(false);

    return response.json();
  };

  return {
    loading,
    request,
  };
};

export default useRequest;
