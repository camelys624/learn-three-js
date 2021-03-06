import React from "react";
import { Link } from "gatsby"
import contentStyle from './index.module.css';

export default (props) => {
  let data = props.data;

  return (
    <div className="content-container">
      {
        data.allSitePage.nodes.map(({ node }) => (
          <div className={contentStyle.containerItem} key={node.id}>
            <Link to={node.path}>
              <h3>
                {node.frontmatter.title}{" "}
                <span style={{color: '#bbb'}}>- {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

