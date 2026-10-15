import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import experiences from "../data/experiences";
import useAnimateOnce from "../hooks/useAnimateOnce";

function ExperienceArticle({ experience }) {
  const { id, company, fullCompanyName, position, period, tasks } = experience;
  const initial = useAnimateOnce(`experience/${id}`);

  return (
    <motion.article
      initial={initial}
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

function ExperienceDetail() {
  const { companyId } = useParams();
  const experience = experiences.find(({ id }) => id === companyId);

  if (!experience) {
    return <Navigate to={`/experience/${experiences[0].id}`} replace />;
  }

  // Keyed so each company mounts fresh and gets its own fade-in, which plays
  // only the first time that company is opened
  return <ExperienceArticle key={companyId} experience={experience} />;
}

export default ExperienceDetail;
