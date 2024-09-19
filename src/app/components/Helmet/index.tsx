import React, { useEffect } from 'react'

interface HelmetProps {
  title?: string
  titleTemplate?: string
}

const Helmet: React.FC<HelmetProps> = (props) => {
  const { title = 'GoodOrder', titleTemplate = '%s - GoodOrder Dashboard' } =
    props

  useEffect(() => {
    if (typeof window === 'object') {
      document.title = titleTemplate.replace('%s', title)
    }
  }, [title, titleTemplate])

  return null
}

export default Helmet
