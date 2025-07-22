import httpRequest from "@/lib/http";

export const hoadonAPI = {
  getHoaDon() {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/hoa-don`;
    return httpRequest.get(url);
  },
};
