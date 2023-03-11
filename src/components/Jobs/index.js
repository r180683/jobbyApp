import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import SalaryRangeItem from '../SalaryRangeItem'
import EmployeeItem from '../EmployeeItem'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsStatusList = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

const profileStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileStatus: profileStatusList.initial,
    jobList: {},
    profileDetails: {},
    searchValue: '',
    empTypeList: [],
    salaryRangeId: '',
    jobsApiStatus: jobsStatusList.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchValue, empTypeList, salaryRangeId} = this.state
    console.log(empTypeList)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empTypeList.join(
      ',',
    )}&minimum_package=${salaryRangeId}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobs: data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        })),
        total: data.total,
      }
      this.setState({
        jobsApiStatus: jobsStatusList.success,
        jobList: updatedData,
      })
    } else {
      this.setState({jobsApiStatus: jobsStatusList.failure})
    }
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const d = await response.json()
      const data = d.profile_details
      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileStatus: profileStatusList.success,
      })
    } else {
      this.setState({profileStatus: profileStatusList.failure})
    }
  }

  updateSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  getSearchResults = () => {
    this.getJobsList()
  }

  changeEmployeeId = id => {
    const {empTypeList} = this.state
    let updatedData = empTypeList.filter(each => {
      if (each !== id) {
        return true
      }
      return false
    })
    if (empTypeList.length === updatedData.length) {
      updatedData = [...updatedData, id]
    }
    this.setState(
      {
        empTypeList: updatedData,
        jobsApiStatus: jobsStatusList.initial,
      },
      this.getJobsList,
    )
  }

  renderEmployeeOptions = () => {
    const {empTypeList} = this.state
    return (
      <ul className="employee-options-list-container">
        <h1 className="head">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <EmployeeItem
            activeEmpTypeList={empTypeList}
            changeEmployeeId={this.changeEmployeeId}
            key={each.employmentTypeId}
            employeeDetails={each}
          />
        ))}
      </ul>
    )
  }

  changeSalaryId = id => {
    this.setState(
      {salaryRangeId: id, jobsApiStatus: jobsStatusList.initial},
      this.getJobsList,
    )
  }

  renderSalaryRangesList = () => {
    const {salaryRangeId} = this.state
    return (
      <ul className="salary-options-list-container">
        <h1 className="head">Salary Range</h1>
        {salaryRangesList.map(each => (
          <SalaryRangeItem
            activeSalaryId={salaryRangeId}
            changeSalaryId={this.changeSalaryId}
            key={each.salaryRangeId}
            salaryDetails={each}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-jobs-head">No Jobs Found</h1>
      <p className="no-job-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobList} = this.state
    const {jobs} = jobList
    if (jobs.length > 0) {
      return (
        <ul className="jobs-success-container">
          {jobList.jobs.map(each => (
            <JobItem jobDetails={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return this.renderNoJobsView()
  }

  renderFailureView = () => (
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
      <button onClick={this.getJobsList} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsStatusList.initial:
        return this.renderLoadingView()
      case jobsStatusList.success:
        return this.renderSuccessView()
      case jobsStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-image" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        onClick={this.getProfileDetails}
        className="retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileStatusList.initial:
        return this.renderLoadingView()
      case profileStatusList.success:
        return this.renderProfileSuccessView()
      case profileStatusList.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="job-options-container">
            <div className="mobile-search-container">
              <input
                onChange={this.updateSearchValue}
                className="mobile-search-element"
                type="search"
                placeholder="Search"
                value={searchValue}
              />
              <button
                onClick={this.getSearchResults}
                className="mobile-search-icon-container"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="mobile-search-icon" />
              </button>
            </div>
            {this.renderProfileDetails()}
            {this.renderEmployeeOptions()}
            {this.renderSalaryRangesList()}
          </div>
          <div className="jobs-data-container">
            <div className="desktop-search-container">
              <input
                onChange={this.updateSearchValue}
                className="desktop-search-element"
                type="search"
                placeholder="Search"
                value={searchValue}
              />
              <button
                onClick={this.getSearchResults}
                className="desktop-search-icon-container"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="mobile-search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
