import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {BsBoxArrowUpRight, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const jobDetailsStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetailsStatus: jobDetailsStatusList.initial, jobAllDetails: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const history = this.props
    const {params} = history.match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          title: data.job_details.title,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        jobAllDetails: updatedData,
        jobDetailsStatus: jobDetailsStatusList.success,
      })
    } else {
      this.setState({jobDetailsStatus: jobDetailsStatusList.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobdetailsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="jobs-failure-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.getJobDetails} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderjobDetailsSuccessView = () => {
    const {jobAllDetails} = this.state
    const {jobDetails, similarJobs} = jobAllDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="all-jds-container">
        <div className="jd-container">
          <div className="job-logo-role-container">
            <img
              className="company-logo"
              alt="job details company logo"
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
          <div className="description-visit-container">
            <h1 className="job-desc-heading">Description</h1>
            <button onClick={this.onVisit} className="visit-btn" type="button">
              <a href={companyWebsiteUrl}>Visit</a>
              <BsBoxArrowUpRight />
            </button>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-desc-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => (
              <SkillItem key={each.name} skillDetails={each} />
            ))}
          </ul>
          <h1 className="job-desc-heading">Life at Company</h1>
          <div className="company-life-container">
            <p className="company-life-description">
              {lifeAtCompany.description}
            </p>
            <img
              alt="life at company"
              className="company-image"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="sjs-container">
          {similarJobs.map(each => (
            <SimilarJobItem key={each.id} similarJobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProductDetails = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case jobDetailsStatusList.initial:
        return this.renderLoadingView()
      case jobDetailsStatusList.failure:
        return this.renderJobdetailsFailureView()
      case jobDetailsStatusList.success:
        return this.renderjobDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-job-details-container">
          {this.renderAllProductDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
