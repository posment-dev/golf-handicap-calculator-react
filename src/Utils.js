export const findHighestIdObjectArray = (array) => {
    let highestId = 0;
    array.forEach(el => {
      if(el.id > highestId) {
        highestId = el.id;
      }
    });
    return highestId;
}