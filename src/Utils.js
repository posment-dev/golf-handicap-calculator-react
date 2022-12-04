export const findHighestIdObjectArray = (array) => {
    let highestId = 0;
    array.forEach(el => {
      if(el.id > highestId) {
        highestId = el.id;
      }
    });
    return highestId;
}

export const calulateScoreDifferential = (scoreTyp, score, pcc, courseRating, slopeRating) => {
  // stroke 18
  return (113 / slopeRating) * (score - courseRating) - pcc;
}