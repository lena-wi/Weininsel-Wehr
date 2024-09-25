import React, { useState } from 'react'

const AdminGuard = ({ children, correctPassword }) => {
    const [inputPassword, setInputPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')

    const handlePasswordChange = (e) => {
        setInputPassword(e.target.value)
        setError('') // Reset error on input change
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputPassword === correctPassword) {
            setIsAuthenticated(true)
        } else {
            setError('Falsches Passwort')
        }
    }

    return (
        <div className="relative">
            {isAuthenticated ? (
                <div className="content">{children}</div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded shadow-md z-60"
                    >
                        <h2 className="text-lg font-semibold mb-4">
                            Gib das Passwort ein
                        </h2>
                        <input
                            type="password"
                            value={inputPassword}
                            onChange={handlePasswordChange}
                            placeholder="Passwort"
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                            required
                        />
                        {error && (
                            <span className="text-red-500 text-center space-x-4">
                                {error}
                            </span>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-black border border-black rounded hover:bg-blue-600"
                        >
                            Bestätigen
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AdminGuard
