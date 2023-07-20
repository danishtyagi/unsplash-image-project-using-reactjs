import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
import LightGallery from "lightgallery/react/Lightgallery.es5";
import "lightgallery/css/lightgallery.css";

const url = `https://api.unsplash.com/search/photos?per_page=30&client_id=${
  import.meta.env.VITE_API_KEY
}`;
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: [`images`, searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No data found</h4>
      </section>
    );
  }

  return (
    <section className="gallery">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <div className="pics">
            <LightGallery speed={500} plugins={[]}>
              <a href={url} key={item.id}>
                <img
                  src={url}
                  key={item.id}
                  alt={item.alt_description}
                  style={{ width: "100%" }}
                ></img>
              </a>
            </LightGallery>
          </div>
        );
      })}
    </section>
  );
};

export default Gallery;
