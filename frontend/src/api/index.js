import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  //   "https://fitnesstrack-vtv1.onrender.com/api/",
});

export const getDashboardDetails = async (token) => {
  try {
    return await API.get("/users/fitdashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(
      "Error fetching dashboard details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getWorkouts = async (token, date) =>
  await API.get(`/users/workout?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/users/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
