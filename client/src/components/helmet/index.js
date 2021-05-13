import React from "react"
import { Helmet } from 'react-helmet-async'

const PageTitle = ({ title, href }) => {
    return (
        <div className="application">
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    )
}

export default PageTitle