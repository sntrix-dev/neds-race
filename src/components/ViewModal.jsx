import useTimer from "../hooks/useTimer";
import { IoMdClose } from "react-icons/io";
import getSymbolFromCurrency from "currency-symbol-map";

const ViewModal = ({ isOpen, onClose, data }) => {
  const {
    race_name,
    advertised_start,
    race_number,
    race_form,
    venue_name,
    venue_country,
  } = data;
  const {
    additional_data,
    distance,
    distance_type,
    race_comment,
    race_comment_alternative,
    track_condition,
    weather,
  } = race_form;

  const additionalData = JSON.parse(additional_data);

  console.log(additionalData);

  const { timeLeft, timeEnded } = useTimer(advertised_start.seconds);

  const getCurrencyMatch = (adData) => {
    if (adData) {
      const availableCurrencies = Object.keys(adData.localised_prizemonies);
      let matching;
      availableCurrencies.forEach((item) => {
        if (
          adData.localised_prizemonies[item].total_value ===
          adData.prizemonies.total_value
        ) {
          matching = item;
        }
      });

      return getSymbolFromCurrency(matching);
    }

    return "";
  };

  return (
    <div
      onClick={onClose}
      className={`w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 transition-all duration-300 ease-in-out z-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {!!data && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[calc(100%_-_2rem)] lg:w-3/4 max-h-[95vh] overflow-y-auto bg-white shadow-lg rounded-lg relative p-8"
        >
          <button className="absolute top-4 right-4 " onClick={onClose}>
            <IoMdClose className="text-2xl" />
          </button>
          <div className="w-full flex flex-wrap items-center gap-6 border-b border-gray-300 pb-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full">
              <h3 className="text-xl font-bold">{race_number}</h3>
            </div>
            <h2 className="text-xl flex-1 font-semibold text-gray-800">
              {race_name}
            </h2>
            {timeEnded && (
              <h2 className="text-xl font-semibold text-red-600">
                Race has ended!
              </h2>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 pt-8">
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
            {!!weather && (
              <div className="flex items-center gap-2 text-gray-700">
                <h3 className="font-medium">Weather:</h3>
                <h3>{weather.name}</h3>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700">
              <h3 className="font-medium">Track Condition:</h3>
              <h3>{track_condition.name}</h3>
            </div>
            {!!additionalData?.revealed_race_info?.track_surface && (
              <div className="flex items-center gap-2 text-gray-700">
                <h3 className="font-medium">Track Surface:</h3>
                <h3>{additionalData.revealed_race_info.track_surface}</h3>
              </div>
            )}
          </div>

          <div className="pt-8 space-y-4">
            <h2 className="text-lg font-semibold">
              Prize pool ({getCurrencyMatch(additionalData?.revealed_race_info)}{" "}
              {additionalData?.revealed_race_info?.prizemonies?.total_value})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {Object.keys(
                additionalData?.revealed_race_info.localised_prizemonies
              ).map((currency, index) => (
                <div key={currency + index}>
                  <h3 className="font-semibold">Currency: {currency}</h3>
                  <div>
                    {Object.keys(
                      additionalData?.revealed_race_info.localised_prizemonies[
                        currency
                      ]
                    )
                      .filter((place) => place !== "total_value")
                      .map((place, i) => (
                        <div
                          key={`${currency}-${index}-${place}-${i}`}
                          className="flex items-center gap-4"
                        >
                          <h3 className="font-medium">{place}: </h3>
                          <h3 className="text-gray-800">
                            {getSymbolFromCurrency(currency)}
                            {additionalData?.revealed_race_info.localised_prizemonies[
                              currency
                            ][place]
                              .toString()
                              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                          </h3>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h2 className="text-lg font-semibold">Comment</h2>
            <p>{race_comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewModal;
