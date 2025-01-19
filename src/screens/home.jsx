import { useEffect, useState } from "react";
import { ApiService } from "../services/api.service";
import SearchBar from "../components/Search";
import RaceCard from "../components/RaceCard";
import { IoMdRefresh } from "react-icons/io";
import ViewModal from "../components/ViewModal";

const HomeScreen = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [endedRacesInCurrentLine, setEndedRacesInCurrentLine] = useState([]);
  const [startRefreshTimer, setStartRefreshTimer] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState(5); //seconds
  const [modal, setModal] = useState({
    status: false,
    data: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ApiService.getNextRaces()
      .then((data) => {
        console.log(data);
        setRaces(Object.values(data.race_summaries));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("API call completed.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (refresh) {
      setRaces([]);
      setLoading(true);
      ApiService.getNextRaces()
        .then((data) => {
          console.log(data);
          setRaces(Object.values(data.race_summaries));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setRefresh(false);
          setStartRefreshTimer(false);
          setRefreshTimer(5);
        });
    }
  }, [refresh]);

  useEffect(() => {
    if (endedRacesInCurrentLine.length >= 4) {
      setStartRefreshTimer(true);
    }
  }, [endedRacesInCurrentLine]);

  useEffect(() => {
    if (startRefreshTimer) {
      const interval = setInterval(() => {
        setRefreshTimer((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          }

          setRefresh(true);

          return 0;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startRefreshTimer]);

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center justify-center px-8 py-4 fixed top-0 bg-white shadow-md z-50">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">NedsRace</h1>
        </div>
        <SearchBar searchQuery={searchTerm} setSearchQuery={setSearchTerm} />
        <div className="flex-1" />
      </header>
      <main className="w-full px-8 pb-10 pt-24 ">
        <div className="my-6 flex items-center gap-4">
          <h1 className="text-2xl font-semibold ">Upcoming Races</h1>
          <button onClick={() => setRefresh(true)} disabled={loading}>
            <IoMdRefresh className="text-2xl" />
          </button>
          {startRefreshTimer && (
            <div className="flex items-center gap-2 text-blue-600">
              {refreshTimer === 0 ? (
                <h1 className="text-base">Refreshing...</h1>
              ) : (
                <>
                  <h1 className="text-base">Refreshing in:</h1>
                  <h1 className="text-base">{refreshTimer}</h1>
                </>
              )}
            </div>
          )}
        </div>
        <div className="w-full  grid grid-cols-1 gap-8 lg:grid-cols-2">
          {races
            .filter((race) => {
              if (searchTerm.length) {
                const isMatch =
                  race.race_name
                    .substring(0, searchTerm.length)
                    .toLowerCase()
                    .trim() === searchTerm.toLowerCase().trim();

                console.log(
                  race.race_name
                    .substring(0, searchTerm.length)
                    .toLowerCase()
                    .trim(),
                  searchTerm.toLowerCase().trim(),
                  isMatch
                );
                return isMatch;
              }

              return true;
            })
            .map((race, index) => (
              <RaceCard
                key={race.race_id}
                {...race}
                onRaceEnd={() =>
                  setEndedRacesInCurrentLine((prevState) =>
                    !prevState.includes(race.race_id)
                      ? [...prevState, race.race_id]
                      : prevState
                  )
                }
                onViewMoreClick={() =>
                  setModal({
                    status: true,
                    data: race,
                  })
                }
              />
            ))}
        </div>
      </main>
      {modal.data && (
        <ViewModal
          isOpen={modal.status}
          data={modal.data}
          onClose={() =>
            setModal({
              data: null,
              status: false,
            })
          }
        />
      )}
    </div>
  );
};

export default HomeScreen;
