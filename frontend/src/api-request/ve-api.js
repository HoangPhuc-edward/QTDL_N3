import httpRequest from "@/lib/http";

export const veAPI = {
  getAllVe() {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ve`;
    return httpRequest.get(url);
  },
  deleteVe(mave) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ve/${mave}`;
    return httpRequest.delete(url);
  },
};
