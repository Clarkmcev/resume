import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fade, rise, slideRight, stagger } from "../animation/variants";
import experiences from "../data/experiences";
import useAnimateOnce from "../hooks/useAnimateOnce";

function ExperienceArticle({ experience }) {
  const { id, company, fullCompanyName, position, period, tasks } = experience;
  const initial = useAnimateOnce(`experience/${id}`);

  // title, then dates, then the tasks one by one
  return (
    <motion.article
      initial={initial}
      animate="visible"
      variants={stagger(0.08)}
      className="inner"
    >
      <motion.div variants={rise} className="position">
        {position}
        <span className="company ml-2">@{fullCompanyName ?? company}</span>
      </motion.div>
      <motion.div variants={fade} className="date">
        {period}
      </motion.div>
      <motion.ul variants={stagger(0.07)} className="flex flex-col space-y-2">
        {tasks.map((task) => (
          <motion.li key={task} variants={slideRight} className="task">
            {task}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}

function ExperienceDetail() {
  const { companyId } = useParams();
  const experience = experiences.find(({ id }) => id === companyId);

  if (!experience) {
    return <Navigate to={`/experience/${experiences[0].id}`} replace />;
  }

  // Keyed so each company mounts fresh and gets its own entrance, which plays
  // only the first time that company is opened
  return <ExperienceArticle key={companyId} experience={experience} />;
}

export default ExperienceDetail;
