// import * as d3 from "d3";
// import dateTool from "@/tools/date";
// import store from "@/store/store"
//
// const load = (source) => {
//     return new Promise((resolve, reject) => {
//         const currentMap = store.state.maps.current;
//         const sourceSettings = currentMap.data.sources[source.title];
//         d3.csv(sourceSettings.url + dateTool.getTimestamp())
//             .then((result) => {
//                 let adapter, keys, lastValue;
//                 adapter = currentMap.data[source.title].adapter;
//                 keys = adapter.getKeys(result.columns);
//                 for (let row of result) {
//                     let title, region;
//                     title = row[adapter.regionKey];
//                     region = store.getters[currentMap.module + '/getItemByProperty']('title', title, true);
//
//                     if (region) {
//                         lastValue = 0;
//                         for (let key of keys) {
//                             let frame, date, value;
//                             value = Number(row[key]);
//                             date = adapter.getDateFromKey(key);
//                             frame = region.report.history.find(f => f.date === date);
//                             if (frame) {
//                                 frame[source.title] = value - lastValue;
//                             } else {
//                                 //console.error('frame with date ' + date + ' not found for hospitalisations data');
//                             }
//                             lastValue = value;
//                         }
//                     } else {
//                         //console.error('Region ' + title + ' not found for hospitalisations data');
//                     }
//                 }
//                 store.commit('sources/updatePropertyOfItem', {item: source, property: 'loaded', value: true});
//                 resolve();
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     })
// };
//
// export default {
//     load
// }
