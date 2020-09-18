import React from "react";
import axios from "axios";

export const apiTestQuests = async () => {
  try {
    const { data } = await axios.get(
      "http://211.43.12.24:9999/api/try_test/19년수능"
    );
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};
