import React from "react"
import { Helmet } from "react-helmet"

const PageTitle = ({ title, href }) => {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href={href} />
            </Helmet>
        </div>
    )
}

export default PageTitle