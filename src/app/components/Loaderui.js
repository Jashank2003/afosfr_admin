import React from 'react';
import styled from 'styled-components';

const Loaderui = () => {
  return (
    <StyledWrapper>
      <svg className="pl" width="128px" height="128px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle className="pl__ring1" cx={64} cy={64} r={60} fill="none" stroke="hsl(3,90%,55%)" strokeWidth={8} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="377 377" strokeDashoffset="-376.4" />
        <circle className="pl__ring2" cx={64} cy={64} r="52.5" fill="none" stroke="hsl(13,90%,55%)" strokeWidth={7} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="329.9 329.9" strokeDashoffset="-329.3" />
        <circle className="pl__ring3" cx={64} cy={64} r={46} fill="none" stroke="hsl(23,90%,55%)" strokeWidth={6} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="289 289" strokeDashoffset="-288.6" />
        <circle className="pl__ring4" cx={64} cy={64} r="40.5" fill="none" stroke="hsl(33,90%,55%)" strokeWidth={5} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="254.5 254.5" strokeDashoffset={-254} />
        <circle className="pl__ring5" cx={64} cy={64} r={36} fill="none" stroke="hsl(43,90%,55%)" strokeWidth={4} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="226.2 226.2" strokeDashoffset="-225.8" />
        <circle className="pl__ring6" cx={64} cy={64} r="32.5" fill="none" stroke="hsl(53,90%,55%)" strokeWidth={3} transform="rotate(-90,64,64)" strokeLinecap="round" strokeDasharray="204.2 204.2" strokeDashoffset="-203.9" />
      </svg>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* From cssbuttons.io by @harmankanda.github.io/New */

  .pl {
   width: 5em;
   height: 5em;
  }

  .pl circle {
   transform-box: fill-box;
   transform-origin: 50% 50%;
  }

  .pl__ring1 {
   animation: ring1 4s 0s ease-in-out infinite;
  }

  .pl__ring2 {
   animation: ring2 4s 0.04s ease-in-out infinite;
  }

  .pl__ring3 {
   animation: ring3 4s 0.08s ease-in-out infinite;
  }

  .pl__ring4 {
   animation: ring4 4s 0.12s ease-in-out infinite;
  }

  .pl__ring5 {
   animation: ring5 4s 0.16s ease-in-out infinite;
  }

  .pl__ring6 {
   animation: ring6 4s 0.2s ease-in-out infinite;
  }

  /* Animations */
  @keyframes ring1 {
   from {
    stroke-dashoffset: -376.237129776;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -94.247778;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -376.237129776;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -94.247778;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -376.237129776;
    transform: rotate(4.75turn);
   }
  }

  @keyframes ring2 {
   from {
    stroke-dashoffset: -329.207488554;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -82.46680575;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -329.207488554;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -82.46680575;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -329.207488554;
    transform: rotate(4.75turn);
   }
  }

  @keyframes ring3 {
   from {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -72.2566298;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -72.2566298;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(4.75turn);
   }
  }

  @keyframes ring4 {
   from {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -63.61725015;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -63.61725015;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(4.75turn);
   }
  }

  @keyframes ring5 {
   from {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -56.5486668;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -56.5486668;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(4.75turn);
   }
  }

  @keyframes ring6 {
   from {
    stroke-dashoffset: -203.795111962;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }

   23% {
    stroke-dashoffset: -51.05087975;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }

   46%, 50% {
    stroke-dashoffset: -203.795111962;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }

   73% {
    stroke-dashoffset: -51.05087975;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }

   96%, to {
    stroke-dashoffset: -203.795111962;
    transform: rotate(4.75turn);
   }
  }`;

export default Loaderui;
