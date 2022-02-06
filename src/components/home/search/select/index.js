const Select = ({ name, item }) => {


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
