import { Link } from "react-router-dom"

const Logo = ({ url = "/" }: { url?: string }) => {
  return (
    <Link to={url} className="text-lg text-gray-800 font-medium">
      JSON Mock Data API
    </Link>
  )
}

export default Logo
