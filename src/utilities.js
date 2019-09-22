const normalizingList = dataList => {
  const data = {};
  const list = dataList.map( d => {
    data[d.id] = d;
    return d.id;
  });
  return {data, list}
}

const genDateFormat = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`
}

export {
	normalizingList,
	genDateFormat,
}