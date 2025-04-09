export function UnitInfo({ info }) {
  return (
    <div>
      <h1>{info.title}</h1>
      <h2>{info.unitInfo.keyStage}</h2>
      <h2>{info.unitInfo.subject}</h2>
    </div>
  );
}
