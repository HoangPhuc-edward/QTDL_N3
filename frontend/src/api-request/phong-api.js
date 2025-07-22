import httpRequest from "@/lib/http";

export const phongAPI = {
  getAllPhong() {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phong`;
    return httpRequest.get(url);
  },
};
