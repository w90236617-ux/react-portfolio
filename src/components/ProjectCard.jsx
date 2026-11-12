import TiltCard from "./TiltCard";

const ProjectCard = ({ title, desc, tech, image, live, index }) => {
  // live link na ho to page reload na ho
  const handleClick = (e) => {
    if (!live) e.preventDefault();
  };

  return (
    <div className="project-item">
      <TiltCard className="project-tilt" max={8} scale={1.03}>
        <a
          href={live || "#"}
          target={live ? "_blank" : undefined}
          rel="noreferrer"
          onClick={handleClick}
          className="project-card"
          aria-label={`${title} - open live project`}
        >
          <div className="project-image" data-tilt-z="30">
            {image ? (
              <img src={image} alt={title} loading="lazy" />
            ) : (
              <div className="project-placeholder">No Image</div>
            )}

            <div className="project-overlay">
              <span className="project-overlay-text">View Live ↗</span>
            </div>
          </div>

          <div className="project-body">
            <span className="project-number" data-tilt-z="55">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="project-title" data-tilt-z="40">
              {title}
            </h3>

            <p className="project-desc">{desc}</p>

            <div className="project-tech" data-tilt-z="25">
              {tech.map((item) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </a>
      </TiltCard>
    </div>
  );
};

export default ProjectCard;