import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="job-logo-role-container">
          <img
            className="company-logo"
            alt="company logo"
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
        <div className="location-package-container">
          <div className="location-container">
            <MdLocationOn className="location-image" />
            <p className="location-text">{location}</p>
            <BsFillBriefcaseFill className="location-image" />
            <p className="location-text">{employmentType}</p>
          </div>
          <p className="location-text">{packagePerAnnum}</p>
        </div>
        <h1 className="job-desc-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
