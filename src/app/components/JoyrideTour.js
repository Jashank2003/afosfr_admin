import { useState, useEffect } from "react";
import Joyride from "react-joyride";

const JoyrideTour = ({ steps, updateTutorialStatus }) => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData?.tutorialDone !== "done") {
      setRunTour(true);
    }
  }, []);

  const handleTourCallback = (data) => {
    const { action, type, status } = data;

    if (type === "tour:end" || status === "finished") {
      // User completed the tour
      updateTutorialStatus("done");
      setRunTour(false);
    } else if (type === "tour:skip" || action === "close") {
      // User skipped or closed the tour early
      updateTutorialStatus("skip");
      setRunTour(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      callback={handleTourCallback}
      continuous
      showSkipButton
      showProgress
      styles={{
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)", // Black transparent background
          color: "#fff", // Default white text
        },
      }}
      disableOverlayClose // Prevent closing the tour by clicking outside
      spotlightClicks={false} // Disables clicking on highlighted elements during the tour
    />
  );
};

export default JoyrideTour;
