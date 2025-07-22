import httpRequest from "@/lib/http";

export const phimAPI = {
  getPhimByDate({ ngay }) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim/ngay/${ngay}`;
    return httpRequest.get(url);
  },
  getAllPhim() {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim`;
    return httpRequest.get(url);
  },
  getById(id) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim/${id}`;
    return httpRequest.get(url);
  },
  createPhim(body) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim`;
    return httpRequest.post(url, { body });
  },
  updatePhim(body) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim`;
    return httpRequest.put(url, { body });
  },
  deletePhim(id) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/phim/${id}`;
    return httpRequest.delete(url);
  },
};
