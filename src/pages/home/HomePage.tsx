import React from "react"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import "./HomePage.scss"

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title">
            Visualize Your <br />
            <span className="highlight-colors">Tools</span> &{" "}
            <span className="highlight-fonts">Workflows</span> <br />
            In One Hub
          </h1>
          <p className="hero-subtitle">
            Choosing the right utility shouldn't be hard. <br />
            Use our fast, all-in-one developer tools to realize your ideas.
          </p>
          <div className="hero-actions">
            <Button size="large" className="btn-secondary">
              How does it work?
            </Button>
            <Button size="large" type="primary" onClick={() => navigate("/features")}>
              Get Started
            </Button>
          </div>
        </div>

        <div className="hero-right">
          <div className="abstract-art">
            <div className="box primary-box"></div>
            <div className="box secondary-box"></div>
            <div className="box text-box"></div>
            <div className="box accent-box"></div>
            <div className="box surface-box"></div>
            <div className="box highlight-box"></div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why DevHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3 className="feature-title">
              <span>Saves time</span>
            </h3>
            <p className="feature-desc">
              No need to spend hours searching for different utilities online. Find everything right
              here!
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3 className="feature-title">
              <span>It's integrated</span>
            </h3>
            <p className="feature-desc">
              JSON formatters, Encoders, Timestamps... DevHub distributes them in a unified
              interface.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">
              <span>It's simple</span>
            </h3>
            <p className="feature-desc">
              Push a few buttons, and there you have it! Clean, intuitive, and ready to use.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Banners Section */}
      <section className="banners-section">
        <div className="banner-grid">
          <div className="banner-large primary-bg">
            <h2>15+ Native Tools</h2>
            <p>and counting...</p>
          </div>
          <div className="banner-square accent-bg">
            <h2>100% Free!</h2>
            <p>Forever.</p>
          </div>
          <div className="banner-rect dark-bg">
            <h2>All Local Support</h2>
            <a href="#github">Check out our repo</a>
          </div>
          <div className="banner-rect error-bg">
            <h2>200+ Weekly Active</h2>
            <a href="#reviews">Leave a review</a>
          </div>
        </div>
      </section>

      {/* 4. Steps Section */}
      <section className="steps-section">
        <div className="steps-left">
          <h2>How Does it Work?</h2>
          <p>Get your tasks done in 4 simple steps.</p>
        </div>
        <div className="steps-right">
          <div className="step-item">
            <span className="step-num highlight-1">1</span>
            <p>Start with picking a required tool from the top navigation menu.</p>
          </div>
          <div className="step-item">
            <span className="step-num highlight-2">2</span>
            <p>Input your raw data, such as JSON, Base64 strings, or timestamps.</p>
          </div>
          <div className="step-item">
            <span className="step-num highlight-3">3</span>
            <p>Instantly see the formatted or converted output on your screen.</p>
          </div>
          <div className="step-item">
            <span className="step-num highlight-4">4</span>
            <p>Happy with the results? Copy it to your clipboard and go!</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
