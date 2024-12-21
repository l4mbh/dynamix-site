import { Container } from '@mui/material'
import PageLayout from '../../layout/PageLayout'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <PageLayout>
      <Container maxWidth="xl">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4 text-gray-700">
              Oops! The page you are looking for does not exist.
            </p>
            <p className="text-lg text-gray-500 mt-2">
              It might have been removed or you may have mistyped the URL.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block px-6 py-2 text-white rounded-none bg-yellow-primary rounded-lg hover:bg-yellow-primary transition duration-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

export default NotFound