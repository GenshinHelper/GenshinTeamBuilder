import "./TutorialBanner.css";

export function TutorialBanner(props) {
  return (
    <div className="tutorial-banner">
      <h3>How to use:</h3>
      <ul>
        <li>Click on Characters you don't have to disable them</li>
        <li>Lock in a character by dragging them into the boxes</li>
        <li>Hit Suggest to get recommended a team!</li>
      </ul>
    </div>
  );
}
