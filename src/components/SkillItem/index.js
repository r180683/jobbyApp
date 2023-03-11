import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-container">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
