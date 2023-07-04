import axios from "axios";

export async function getRequest(
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  const source = axios.CancelToken.source();
  try {
    const response = await axios.get(buildFullUrl(url), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    });
    setState(response.data);
    return { response, source };
  } catch (err) {
    console.error(err);
  }
  return { source };
}

export async function postRequest(
  url: string,
  data: object,
  setState?: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  try {
    console.log("data fed into postrequest", data);
    const response = await axios.post(buildFullUrl(url), data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      if (setState) setState(response.data);
    }
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function putRequest(
  url: string,
  updatedData: object,
  setState?: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const token = localStorage.getItem("token");
    console.log("fire put request");
    const response = await axios.put(buildFullUrl(url), updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("PUT RESPONSE", response);
    console.log("res status:", !!response.status);
    console.log("setState func:", !!setState);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function deleteRequest(
  url: string,
  id: number,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  console.log("fire delete request");
  try {
    await axios.delete(buildFullUrl(url), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setState((prevState: { [key: string]: any }[]) =>
      prevState.filter((state: any) => state.id !== id)
    );
  } catch (err) {
    console.error(err);
  }
}

export const buildFullUrl = (url: string) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  if (serverUrl) {
    return serverUrl + url;
  } else {
    return url;
  }
};
