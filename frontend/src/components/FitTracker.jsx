import React, { useEffect, useState } from "react";
import FitnessNavbar from "./FitnessNavbar.jsx";
import AccessDenied from "./AccessDenied.jsx";
import { Vortex } from "./ui/vortex";
import { useSelector } from "react-redux";
import { counts } from "../assets/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout.jsx";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

const FitTracker = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]); // Default to an empty array
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    //const token = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    await getWorkouts(token, "").then((res) => {
      console.log(res.data); // Log the response to check the structure
      setTodaysWorkouts(res?.data?.todaysWorkouts || []); // Ensure it's an empty array if undefined
      setLoading(false);
    });
  };
  const addNewWorkout = async () => {
    setButtonLoading(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token; // Safely access token
    try {
      const response = await addWorkout(token, { workoutString: workout });
      const newWorkout = response.data; // Assuming API returns the new workout

      // Update state locally for a quick UI update
      setTodaysWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);

      // Optionally refetch to ensure data consistency
      dashboardData();
      getTodaysWorkout();
    } catch (err) {
      alert(err.message || "Failed to add workout");
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        {userData ? (
          <>
            <FitnessNavbar />
            <div className="flex flex-1 h-full justify-center overflow-y-scroll py-5 bg-white">
              <div className="flex flex-col flex-1 max-w-[1400px] gap-5 sm:gap-3">
                <div className="px-4 text-xl font-medium text-gray-800 dark:text-gray-100">
                  Dashboard
                </div>
                <div className="flex flex-wrap justify-between gap-5 px-4 sm:gap-3">
                  {counts.map((item, index) => (
                    <CountsCard
                      key={item.id || index}
                      item={item}
                      data={data}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap justify-between gap-5 px-4 sm:gap-3">
                  <WeeklyStatCard data={data} />
                  <CategoryChart data={data} />
                  <AddWorkout
                    workout={workout}
                    setWorkout={setWorkout}
                    addNewWorkout={addNewWorkout}
                    buttonLoading={buttonLoading}
                  />
                </div>
                <div className="flex flex-col gap-5 px-4 sm:gap-3">
                  <div className="px-4 text-xl font-medium text-gray-800 dark:text-gray-100">
                    Today's Workouts
                  </div>
                  <div className="flex flex-wrap justify-center gap-5 mb-24 sm:gap-3">
                    {loading ? (
                      <Vortex />
                    ) : todaysWorkouts.length > 0 ? (
                      todaysWorkouts.map((workout, index) => (
                        <WorkoutCard
                          key={workout.id || index}
                          workout={workout}
                        />
                      ))
                    ) : (
                      <p>No workouts available today.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AccessDenied />
        )}
      </Vortex>
    </div>
  );
};
export default FitTracker;
