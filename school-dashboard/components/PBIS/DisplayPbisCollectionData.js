import ProgressBar from '@ramonak/react-progress-bar';
import { capitalizeFirstLetter } from '../../lib/nameUtils';
import { TeamCardStyles } from '../../pages/pbis';
import { useUser } from '../User';

export default function DisplayPbisCollectionData({ collectionData }) {
  const me = useUser();
  const taWinners = JSON.parse(collectionData.randomDrawingWinners);
  const studentsWhoWentUpLevel = JSON.parse(
    collectionData.personalLevelWinners
  );
  const currentTeamLevelGoal = collectionData.currentPbisTeamGoal;
  const taTeamsLevels = JSON.parse(collectionData.taTeamsLevels);
  const teamsThatWentUpLevel = JSON.parse(collectionData.taTeamNewLevelWinners);
  const totalNumberOfTas = taWinners.length;
  const teamsAtCurrentGoalLevel = taTeamsLevels.reduce(
    (acc, curr) =>
      curr.currentTaLevel >= currentTeamLevelGoal ? acc + 1 : acc,
    0
  );
  const percentageOfTaTeamsAtCurrentGoalLevel = Math.round(
    (teamsAtCurrentGoalLevel / taTeamsLevels.length) * 100
  );
  const viewAllData = me?.isStaff;
  // console.log("studentsWhoWentUpLevel", studentsWhoWentUpLevel);
  // console.log("teamsThatWentUpLevel", teamsThatWentUpLevel);
  // console.log("taTeamsLevels", taTeamsLevels);
  // console.log("taWinners", taWinners);
  return (
    <div>
      <h2>Stats at last collection: {collectionData.name}</h2>
      <h3>
        {teamsAtCurrentGoalLevel} of {taTeamsLevels.length} TA's have reached
        level {currentTeamLevelGoal}
      </h3>

      <h3 className="hidePrint">
        {teamsThatWentUpLevel.length} of {taTeamsLevels.length} TA Teams and{' '}
        {studentsWhoWentUpLevel.length} students have gone up a level
        <ProgressBar
          completed={percentageOfTaTeamsAtCurrentGoalLevel}
          bgColor="var(--blue)"
          className="hidePrint"
        />
      </h3>
      {viewAllData && (
        <TeamCardStyles>
          {teamsThatWentUpLevel.map((team) => (
            <div key={team.id}>
              <h3>Team Level-Up</h3>
              <h4>{team.name}</h4>
              <h4>Level {team.currentTaLevel}</h4>
              <p>{Math.round(team.averageCardsPerStudent)} cards per student</p>
            </div>
          ))}
          {studentsWhoWentUpLevel.map((student) => (
            <div key={student.student}>
              <h3>Student Level-Up</h3>
              <h4>{student.name}</h4>
              <h4>Level {student.individualPbisLevel}</h4>
            </div>
          ))}
          {taWinners.map((ta) => (
            <div key={ta.id}>
              <h3>Random Drawing Winner</h3>
              <h4>{ta.name}</h4>
              <p>{capitalizeFirstLetter(ta.randomWinner.name)}</p>
            </div>
          ))}
        </TeamCardStyles>
      )}
    </div>
  );
}
