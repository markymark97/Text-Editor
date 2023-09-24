import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (id, value) => {
  console.error()
  console.log('PUT to database');
  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: id, value: value })
  const res = await req;
  console.log('data saved to the jateDB', res);
};


export const getDb = async () => {
  console.error(); 
  console.log('GET from  database'); 
  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readonly'); 
  const store = tx.objectStore('jate');  
  const req = store.get(1);          
  const res = await req;          
  console.log('Data saved intp database', res);
  return res?.value;                   
};

initdb();
