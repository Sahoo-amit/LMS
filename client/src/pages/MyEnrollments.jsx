import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import { CardSkeleton } from "../components/Skeleton";

const MyEnrollments = () => {
  const [myCourses, setMyCourses] = useState([]);
  const { userId, token } = AuthStore();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto my-20 px-6 md:px-0">
      <h1 className="text-2xl font-bold">My Enrollments</h1>
      <div className="my-10">
        {isLoading ? (
          <CardSkeleton />
        ) : myCourses.length === 0 ? (
          <p>You haven't purchsed any course.</p>
        ) : (
          <p>You have purchsed following courses.</p>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;
