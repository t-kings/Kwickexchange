import React, { useReducer } from "react";
import axios from "axios";
import { apiUrl, TestimonialContext } from "../root";
import TestimonialReducer from "../reducers/testimonialReducer";

const TestimonialState = (props) => {
  const initialState = {
    testimonials: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(TestimonialReducer, initialState);

  // GET ALL CAKES
  const getTestimonials = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      //   const res = await axios.get(apiUrl + "/misc/testimonial");
      const res = {
        status: 200,
        data: {
          message: "success",
          data: [
            {
              id: "601deeec700d837dd51cb144",
              name: "Ben Murray",
              title: "Head Boy",
              message: " A good one",
            },
            {
              id: "601def1a700d837dd51cb145",
              name: "Ben Murray Bruce",
              title: "Head Boy",
              message: "Another A good one",
            },
          ],
        },
      };
      if (res.status === 200) {
        dispatch({ type: "GET_TESTIMONIALS", payload: res.data.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TestimonialContext.Provider
      value={{
        ...state,
        getTestimonials,
      }}
    >
      {props.children}
    </TestimonialContext.Provider>
  );
};

export default TestimonialState;
