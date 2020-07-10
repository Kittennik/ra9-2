import {useState, useEffect} from 'react';

export default function useJsonFetch() {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { url, method, headers, body } = value;
        const response = await fetch(url, {
          method,
          headers,
          body,
        });

        if (!response.ok) {
          console.log(response.status, response.body);
          // eslint-disable-next-line no-undef
          setError(response.statusText);
        }

        if (response.status === 204) {
          setData({
            resolve: '',
            status: response.status,
          });
        } else {
          const resolve = await response.json();
          console.log(resolve);
          setData({
            resolve,
            status: response.status,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (value) {
      fetchData();
    }
    console.log(data);  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue, data, loading];
}
