import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Location } from "@/types/rick-and-morty-api/location";
import useCharacterPage from "@/src/hooks/useCharacterPage";
import { availableFilters } from "@/types/filters";
import { hasItems } from "@/utils/list";

const LocationFilter = () => {
  const {
    fetchLocations,
    setSelectedLocation,
    updateActiveFiltersForKey,
    clearFilters,
  } = useCharacterPage();
  return (
    <div className="flex flex-col gap-2 px-2 flex-1">
      <h3 className="text-gray-200 text-lg">Location</h3>
      <AsyncSelect
        className="react-select-container"
        classNamePrefix="react-select"
        cacheOptions
        // @ts-ignore
        loadOptions={fetchLocations}
        getOptionLabel={(location: Location) => location.name}
        getOptionValue={(location: Location) => location.id.toString()}
        onInputChange={(data) =>
          updateActiveFiltersForKey("locationName", data)
        }
        isMulti
        placeholder="Select Location"
        onChange={(data) => {
          if (hasItems(data.length)) {
            setSelectedLocation(data.map((item) => item));
            return;
          }
          clearFilters();
        }}
      />
    </div>
  );
};

const GenderFilter = () => {
  const { updateActiveFiltersForKey } = useCharacterPage();
  return (
    <div className="flex flex-col gap-2 flex-1 lg:max-w-[25vw]">
      <h3 className="text-gray-200 text-lg">Gender</h3>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={availableFilters.gender?.map((item) => ({
          label: item,
          value: item,
        }))}
        isMulti
        placeholder="Select Character Gender"
        onChange={(data) => {
          updateActiveFiltersForKey(
            "gender",
            Array.from(data.values().map((val) => val.value)),
          );
        }}
      />
    </div>
  );
};

const SpeciesFilter = () => {
  const { updateActiveFiltersForKey } = useCharacterPage();
  return (
    <div className="flex flex-col gap-2 flex-1 lg:max-w-[25vw]">
      <h3 className="text-gray-200 text-lg">Species</h3>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={availableFilters.species?.map((item) => ({
          label: item,
          value: item,
        }))}
        isMulti
        placeholder="Select character species"
        onChange={(data) => {
          updateActiveFiltersForKey(
            "species",
            Array.from(data.values().map((val) => val.value)),
          );
        }}
      />
    </div>
  );
};

const Filters = () => {
  return (
    <div className="flex md:flex-row w-full flex-col gap-2">
      <GenderFilter />
      <SpeciesFilter />
      <LocationFilter />
    </div>
  );
};

export default Filters;
