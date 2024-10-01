import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const LinkButton = ({ topic }) => {
    return (
        <Link key={topic.id} to={topic.href}>
            <div
                key={topic.id}
                className="px-6 py-4 border opacity-85 text-center text-black font-light rounded-lg shadow-lg transition-colors hover:cursor-pointer"
            >
                {topic.name}
            </div>
        </Link>
    )
}

LinkButton.propTypes = {
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    }).isRequired,
}

export default LinkButton
