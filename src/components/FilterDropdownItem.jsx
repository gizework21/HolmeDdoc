
export default function FilterDropdownItem({ index, selectedItem, option, handleItemSelected, type, nameKey, cursor, idNotInteger }) {
  const handleSelected = (selected) => {
    // if(type){
    //   selected = {...selected, type}
    // }
    handleItemSelected(selected)
  }
  const selectedId = selectedItem.id
  let highlightSelected = idNotInteger ? selectedId === option.id : parseInt(selectedId) === parseInt(option.id)
  if(type){
    highlightSelected = highlightSelected && type === selectedItem.type
  }

  nameKey = nameKey ? nameKey : 'title'

  return (
    <h6
      className={`relative cursor-default mt-1 select-none ${
        highlightSelected
          ? "bg-pink-50 font-medium text-red-500"
          : "text-primary"
      } hover:bg-pink-100  ${cursor === index && "bg-pink-100 active-dropdown-item"}`} // made the bg color more visible --> Ubaid
      onClick={() => handleSelected(option)}
      key={option.id}
    >
      {option[nameKey]}
    </h6>
  );
}

// ${cursor === index && "bg-pink-50 active-dropdown-item"}