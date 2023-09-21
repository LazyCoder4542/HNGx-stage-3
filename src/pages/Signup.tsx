import React, { useState } from "react";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import formStyles from "./form.module.css";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<{ name: string[], mail: string[]; password: string[] }>({
    name: [],
    mail: [],
    password: [],
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError({ name: [], mail: [], password: [] });
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      await updateProfile(auth.currentUser as User, {displayName: name || "user"})
      .then(()=> navigate("/"))
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (error.code === "auth/invalid-email") {
          setError((prev) => {
            return { ...prev, mail: prev.mail.concat(["Please input a valid email address"]) };
          });
          console.log("Please input a valid email address");
        } else if (error.code === "auth/missing-password") {
          setError((prev) => {
            return { ...prev, password: prev.password.concat(["Password is required!"]) };
          });
        } else if (error.code === "auth/weak-password") {
          setError((prev) => {
            return { ...prev, password: prev.password.concat(["Password should be at least 6 characters"]) };
          });
        } else if (
          error.code === "auth/email-already-in-use ") {
          setError((prev) => {
            return { ...prev, mail: prev.mail.concat(["Email already in use by a different account"]) };
          });
        } else console.log("Authentication Error, Please try again later!");
    }
  };
  return (
    <>
      <main>
        <section className={formStyles.section}>
          <div>
            <h2> Sign Up </h2>
            <form>
              <div>
                <label htmlFor="display-name">Display name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Display name"
                />
                {
                  error.name.length > 0 ? 
                  <div>
                    {error.name.map((type, idx) => {
                      return <span key={idx} className={formStyles.error_text}>{type}</span>
                    })}
                  </div> : null
                }
              </div>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
                {
                  error.mail.length > 0 ? 
                  <div>
                    {error.mail.map((type, idx) => {
                      return <span key={idx} className={formStyles.error_text}>{type}</span>
                    })}
                  </div> : null
                }
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                {
                  error.password.length > 0 ? 
                  <div>
                    {error.password.map((type, idx) => {
                      return <span key={idx} className={formStyles.error_text}>{type}</span>
                    })}
                  </div> : null
                }
              </div>

              <button
                className="btn btn-primary rounded"
                type="submit"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </form>

            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Signup;
