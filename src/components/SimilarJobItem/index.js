import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,
    rating,
  } = similarJobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="sj-container">
        <div className="job-logo-role-container">
          <img
            className="company-logo"
            alt="similar job company logo"
            src={companyLogoUrl}
          />
          <div className="company-name-rating-container">
            <h1 className="company-title">{title}</h1>
            <div className="star-rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="job-desc-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="sj-location-container">
          <div className="sj-loaction-container">
            <MdLocationOn className="location-image" />
            <p className="location-text">{location}</p>
          </div>
          <div className="sj-loaction-container">
            <BsFillBriefcaseFill className="location-image" />
            <p className="location-text">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobItem
