import './index.css'

const SalaryRangeItem = props => {
  const {salaryDetails, activeSalaryId, changeSalaryId} = props
  const {salaryRangeId, label} = salaryDetails
  const onChangeSalaryId = () => {
    changeSalaryId(salaryRangeId)
  }
  return (
    <li onClick={onChangeSalaryId} className="salary-option">
      <input
        checked={activeSalaryId === salaryRangeId}
        id={salaryRangeId}
        type="radio"
      />
      <label htmlFor={salaryRangeId} className="label-element">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
