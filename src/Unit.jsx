import { useEffect, useState, useCallback } from "react";
import { UnitInfo } from "./components/UnitInfo";
import { Lessons } from "./components/Lessons";

function Unit({ unitId }) {
  const [unitInfo, setUnitInfo] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnitAndLessons = useCallback(async () => {
    try {
      const [unitResponse, lessonsResponse] = await Promise.all([
        fetch(`http://localhost:3001/units/${unitId}`),
        fetch(`http://localhost:3001/units/${unitId}/lessons`),
      ]);

      if (!unitResponse.ok || !lessonsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const unitData = await unitResponse.json();
      const lessonsData = await lessonsResponse.json();

      setUnitInfo(unitData);
      setLessons(lessonsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching unit and lessons info:", error);
      setError("Error fetching unit and lessons info");
      setLoading(false);
    }
  }, [unitId]);

  useEffect(() => {
    fetchUnitAndLessons();
  }, [fetchUnitAndLessons, unitId]);
  console.log(unitInfo);
  console.log(lessons);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {unitInfo && <UnitInfo info={unitInfo} />}
      {lessons && <Lessons lessons={lessons} />}
    </>
  );
}

export default Unit;
