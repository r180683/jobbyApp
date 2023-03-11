import './index.css'

const EmployeeItem = props => {
  const {activeEmpTypeList, employeeDetails, changeEmployeeId} = props
  const {label, employmentTypeId} = employeeDetails
  const onChangeEmployeeId = () => {
    changeEmployeeId(employmentTypeId)
  }
  const isActive = activeEmpTypeList.filter(each => {
    if (each === employmentTypeId) {
      return true
    }
    return false
  })
  return (
    <li onClick={onChangeEmployeeId} className="empolyee-option-container">
      <input
        checked={isActive.length > 0}
        id={employmentTypeId}
        type="checkbox"
      />
      <label htmlFor={employmentTypeId} className="label-element">
        {label}
      </label>
    </li>
  )
}

export default EmployeeItem
