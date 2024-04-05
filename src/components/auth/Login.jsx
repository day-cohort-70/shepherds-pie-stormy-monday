import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getEmployeeByEmail } from "../../services/UserService"

export const Login = () => {
  const [email, set] = useState("JoePie@shepherd.com")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "shepherds_user",
          JSON.stringify({
            id: user.id,
            isAdmin: user.admin,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Welcome to Shepherd's Pies!</h1>
          <h2>Please login with your email</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
