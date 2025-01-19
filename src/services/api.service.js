import axios from "axios";

const getNextRaces = async () => {
  try {
    const response = await axios.get(
      "https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10"
    );

    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiService = {
  getNextRaces,
};
