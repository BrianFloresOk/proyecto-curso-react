import React from "react";
import { Link } from "react-router-dom";


export const ProjectPreview = ({name, _id, client}) => {
  return (
    <div 
      className="border border-solid border-blue-300 pl-3 mb-3 py-3"
    >
        <p
          className="text-gray-50 mt-0.5 text-xl font-mono mb-3"
        >
           {`${name} `}
           <span
           >
            { `| ${client}` }
           </span>
        </p>
        <Link
            className="p-2 bg-gray-50 border-none rounded-md text-gray-700 mb-1"
            to={`/projects/${_id}`}
        >
            Ver proyecto
        </Link>
        
    </div>
  );
};