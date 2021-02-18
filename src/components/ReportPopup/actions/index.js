export const ACTION_TYPE = {
  OPEN_REPORT: "OPEN_REPORT",
  CLOSE_REPORT: "CLOSE_REPORT",
}

export const openReport = (teamName, teamId, memberHandle) => ({
  type: ACTION_TYPE.OPEN_REPORT,
  payload: { teamName, teamId, memberHandle }
})

export const closeReport = () => ({
  type: ACTION_TYPE.CLOSE_REPORT
})
