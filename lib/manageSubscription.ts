import axios from "axios";

export default async function manageSubscription() {
  let url = null;
  let error = null;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/payments/manage-subscription",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      }
    );

    url = response.data.redirectUrl;
  } catch (err: any) {
    error = err.message ?? "Something went wrong";
  }

  return { url, error };
}
