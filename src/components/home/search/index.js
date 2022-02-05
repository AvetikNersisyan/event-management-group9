import Select from "./select";

const selectStates = {
  name: "All States",
  item: ["All", "California", "Texas", "Washington"],
};

const selectCities = {
  name: "All Cities",
  item: ["All", "Austin", "Dallas", "Houston"],
};
const selectVenue = {
  name: "All Cities",
  item: ["All", "Yerevan 1p 5sh", "Yerevan 2p 4sh", "Yerevan 3p 3sh"],
};
const selectTime = {
  name: "All Cities",
  item: [
    "All",
    "Today",
    "Tomorrow",
    "This Week",
    "This Weekend",
    "Next Week",
    "Next Month",
  ],
};

const selectCategori = {
  name: "All Cities",
  item: ["All", "1", "2", "3", "4", "5"],
};

const Search = () => {
  return (
    <div className="search_wrapper">
      <h2>Find Nearby Location</h2>
      <h3>Explore top-rated attractions, activities and more!</h3>
      <div className="search_form">
        <form action="#">
          <input type="search" style={{ border: "1px solid black" }} />
          <Select {...selectStates} />
          <Select {...selectCities} />
          <Select {...selectVenue} />
          <Select {...selectTime} />
          <Select {...selectCategori} />
        </form>
      </div>
    </div>
  );
};
export default Search;
