import React, { useState, useEffect } from "react";
import "./Lab.css";
import "./github.css";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useLocation } from "react-router-dom";

const Lab = ({ labs }) => {
  let { id } = useParams();
  // console.log("id", id);

  const [labContent, setLabContent] = useState();
  const [navState, setNavState] = useState();

  useEffect(() => {
    console.log("Lab", "useEffect", labs);
    const newLabContent = labs.find((lab) => lab.id === id);
    console.log(newLabContent);
    setLabContent(newLabContent);
    if (newLabContent !== undefined && newLabContent.hasOwnProperty("steps")) {
      setNavState(Array(newLabContent.steps.length).fill(false));
    }
  }, [labs, id]);

  const scrolledRef = React.useRef(false);
  const { hash } = useLocation();

  useEffect(() => {
    console.log("useEffect");
    if (hash && !scrolledRef.current) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        scrolledRef.current = true;
      }
    }
  });

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {String(children).replace(/\n$/, "")}
        </code>
      );
    },
  };
  // console.log(atomDark);
  const handleStepToggle = (event) => {
    let newNavState = [...navState];
    newNavState[event.target.dataset.index] =
      !newNavState[event.target.dataset.index];
    setNavState(newNavState);
  };
  return (
    <div className="Lab">
      {labContent ? (
        <div className="LabContent">
          <div className="LabInfo">
            <h1>{labContent.title}</h1>
            <p>{labContent.level}</p>
            <p className="LabTags">
              {labContent.metadata.tags.map((tag, index) => {
                return (
                  <span key={index} className="tags">
                    {tag}{" "}
                  </span>
                );
              })}
            </p>
          </div>

          <div className="LabNav">
            {labContent.steps.map((step, stepIndex) => {
              return (
                <div key={stepIndex}>
                  <li className="step">
                    <a href={`#section${stepIndex}`} data-index={stepIndex}>
                      {step.text}
                    </a>
                    {step.subSteps.length > 0 ? (
                      <img
                        onClick={handleStepToggle}
                        data-index={stepIndex}
                        className="arrowDown"
                        alt="arrowDown"
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wMTEgNTEyLjAxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNNTA1Ljc1NSwxMjMuNTkyYy04LjM0MS04LjM0MS0yMS44MjQtOC4zNDEtMzAuMTY1LDBMMjU2LjAwNSwzNDMuMTc2TDM2LjQyMSwxMjMuNTkyYy04LjM0MS04LjM0MS0yMS44MjQtOC4zNDEtMzAuMTY1LDAgICAgcy04LjM0MSwyMS44MjQsMCwzMC4xNjVsMjM0LjY2NywyMzQuNjY3YzQuMTYsNC4xNiw5LjYyMSw2LjI1MSwxNS4wODMsNi4yNTFjNS40NjIsMCwxMC45MjMtMi4wOTEsMTUuMDgzLTYuMjUxbDIzNC42NjctMjM0LjY2NyAgICBDNTE0LjA5NiwxNDUuNDE2LDUxNC4wOTYsMTMxLjkzMyw1MDUuNzU1LDEyMy41OTJ6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                      />
                    ) : null}
                  </li>

                  {navState[stepIndex] &&
                    step.subSteps.map((subStep, subStepIndex) => {
                      return (
                        <li key={subStepIndex} className="subStep">
                          <a href={`#section${stepIndex}${subStepIndex}`}>
                            {subStep.text}
                          </a>
                        </li>
                      );
                    })}
                </div>
              );
            })}
          </div>
          <div className="LabText">
            {labContent.steps.map((step, stepIndex) => {
              return (
                <div key={stepIndex} className="stepH2">
                  <div className="h2Content">
                    <h2 id={`section${stepIndex}`}>{step.text}</h2>
                    <ReactMarkdown
                      className="markdown-body"
                      components={components}
                      remarkPlugins={[gfm]}
                      children={"blah"}
                    />
                  </div>

                  {step.subSteps.map((subStep, subStepIndex) => {
                    return (
                      <div key={subStepIndex} className="SubStepH3">
                        <div className="h3Content">
                          <h3 id={`section${stepIndex}${subStepIndex}`}>
                            {subStep.text}
                          </h3>

                          <ReactMarkdown
                            className="markdown-body"
                            components={components}
                            remarkPlugins={[gfm]}
                            children={subStep.raw}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Lab;
