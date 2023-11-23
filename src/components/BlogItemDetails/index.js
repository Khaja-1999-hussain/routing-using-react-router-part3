import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoader: true}

  componentDidMount() {
    this.getBlogsDate()
  }

  getBlogsDate = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      content: data.content,
      title: data.title,
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
      author: data.author,
    }
    this.setState({blogData: updatedData, isLoader: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {id, title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <Link to={`/blogs/${id}`}>
        <div className="blog-info">
          <h2 className="blog-details-title">{title}</h2>

          <div className="author-details">
            <img className="author-pic" src={avatarUrl} alt={author} />
            <p className="details-author-name">{author}</p>
          </div>

          <img className="blog-image" src={imageUrl} alt={title} />
          <p className="blog-content">{content}</p>
        </div>
      </Link>
    )
  }

  render() {
    const {isLoader} = this.state
    return (
      <div className="blog-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
