export const findHighestIdObjectArray = (array) => {
  return Math.max.apply(null, array.map(a => a.id))
}

export const findLowestIdObjectArray = (array) => {
  return Math.min.apply(null, array.map(a => a.id))
}

export const calulateScoreDifferential = (scoreTyp, score, pcc, courseRating, slopeRating) => {
  return (113 / slopeRating) * (score + pcc - courseRating);
}