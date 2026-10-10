import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import experiences from "../data/experiences";

function ExperienceDetail() {
  const { companyId } = useParams();
  const experience = experiences.find(({ id }) => id === companyId);

  if (!experience) {
    return <Navigate to={`/experience/${experiences[0].id}`} replace />;
  }

  const { company, fullCompanyName, position, period, tasks } = experience;

  return (
    <motion.article
      // Re-mount on company change so the fade-in replays.
      key={companyId}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="inner"
    >
      <div className="position">
        {position}
        <span className="company ml-2">@{fullCompanyName ?? company}</span>
      </div>
      <div className="date">{period}</div>
      <ul className="flex flex-col space-y-2">
        {tasks.map((task) => (
          <li key={task} className="task">
            {task}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default ExperienceDetail;
