const Select = ({ name, item }) => {
  console.log("props_name", name);
  console.log("props_item", item);
  return (
    <select id={name} name={name}>
      <option value="" disabled selected hidden>
        {name}
      </option>
      {item.map((elem) => (
        <option value={elem}>{elem}</option>
      ))}
    </select>
  );
};

export default Select;
