export const fetchNewsResults = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsResults`
  );
  const data = await response.json();
  return data;
};
