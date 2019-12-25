export const logger = (store) => (next) => (action) => {
  if (window.process.env.NODE_ENV != 'production') {
    console.group(action.type);
    console.info('dispatching', action);
  }

  const result = next(action);

  if (window.process.env.NODE_ENV != 'production') {
    console.log('next state', store.getState());
    console.groupEnd(action.type);
  } 
  // localStorage.setItem("store", JSON.stringify(store.getState()))
  // const myaction = {};
  // myaction.action = action.type;
  // action.card ? myaction.art = action.card.text : '';
  // if(action.b){
  //     if(action.b==='true'){myaction.modal = 'true'}
  //     if(action.b==='false'){myaction.modal = 'false'}
  // };
  // action.title ? myaction.title = action.title : '';
  // myaction.uuid = store.getState().app.uuid;
  // const formData = new FormData()
  // formData.append('action', JSON.stringify(myaction));
  // fetch('reflect.php', {
  //   method: 'POST',
  //   body: formData,
  //   mode: 'no-cors',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })


  return result;
};
