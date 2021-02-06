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
  const getTestimonials = async (testimonials) => {
    dispatch({ type: "GET_TESTIMONIALS", payload: testimonials });
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
