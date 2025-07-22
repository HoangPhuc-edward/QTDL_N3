"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function PhimDetail() {
  const params = useParams();
  const phimId = params.phimid;

  useEffect(() => {
    const fetchAPI = async () => {};
    fetchAPI();
  }, []);
  return <div>a</div>;
}

export default PhimDetail;
