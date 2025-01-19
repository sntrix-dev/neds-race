import moment from "moment";
import useTimer from "../hooks/useTimer";
import { useEffect, useState } from "react";

const RaceCard = ({
  race_name,
  race_number,
  advertised_start,
  race_form,
  disable = false,
  onRaceEnd,
  onViewMoreClick,
  venue_name,
  venue_country,
}) => {
  const [disableCard, setDisableCard] = useState(disable);

  const { distance, distance_type, weather, track_condition } = race_form;
  const { seconds } = advertised_start;
  const { timeLeft, timeEnded } = useTimer(seconds);

  useEffect(() => {
    setDisableCard(timeEnded);
    if (timeEnded) {
      onRaceEnd();
    }
  }, [timeEnded]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg relative">
      {disableCard && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white">Race has ended</h1>
        </div>
      )}
      <div className="w-full flex items-center gap-6 border-b border-gray-300 pb-4">
        <div className="flex  items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full">
          <h3 className="text-xl font-bold">{race_number}</h3>
        </div>
        <h2 className="text-xl flex-1 font-semibold text-gray-800 line-clamp-2">
          {race_name}
        </h2>
      </div>
      <div className="space-y-2 pt-4">
        <div className="flex items-center gap-2 text-gray-700">
          <h3 className="font-medium">Venue:</h3>
          <h3>
            {venue_name}, {venue_country}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <h3 className="font-medium">Time left:</h3>
          <h3>
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <h3 className="font-medium">Distance:</h3>
          <h3>{distance}</h3>
          <h3>{distance_type.name}</h3>
        </div>
        {weather && (
          <div className="flex items-center gap-2 text-gray-700">
            <h3 className="font-medium">Weather:</h3>
            <h3>{weather.name}</h3>
          </div>
        )}
        {track_condition && (
          <div className="flex items-center gap-2 text-gray-700">
            <h3 className="font-medium">Track Condition:</h3>
            <h3>{track_condition.name}</h3>
          </div>
        )}
      </div>
      <div className="w-full pt-4 flex items-center justify-center">
        <button
          className=" text-blue-600  rounded-md  transition duration-300"
          onClick={onViewMoreClick}
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default RaceCard;
