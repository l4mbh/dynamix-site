export const fetchResource = (apiFunction: () => Promise<{ data: any }>, setState: any) => async () => {
  try {
    const respone = await apiFunction();
    const data = respone.data;
    setState(data);
  } catch (error) {
    console.log("Error fetching services: ", error)
  }
}