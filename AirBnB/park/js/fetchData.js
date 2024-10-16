const fetchData = async (uri) => {
  const response = await fetch(uri);
  const data = await response.json();

  return data;
};

export default fetchData;
