import Dexie from 'dexie';

let db = new Dexie('swatches');

db.version(1).stores({
  palettes: 'id, name, colors', 
  projects: 'id, name'
});

export const saveOfflineProject = (project) => {
 // add markdown to IDB
 return db.projects.add(project)
}

export const saveOfflinePalette = (palette) => {
 // add markdown to IDB
 return db.palettes.add(palette)
}

export const getSingleProject = (id) => {
  // retrieve single markdown from IDB by id
  return db.projects.get(parseInt(id))
}

export const getSinglePalette = (id) => {
  // retrieve single markdown from IDB by id
  return db.palettes.get(parseInt(id))
}

export const loadOfflineProjects = () => {
  // retrieve all markdowns from IDB
  return db.projects.toArray();
}; 

export const loadOfflinePalettes = () => {
  // retrieve all markdowns from IDB
  return db.palettes.toArray();
};

export const setPendingProjectsToSynced = () => {
  return db.projects.where('status').equals('pendingSync').modify({status: 'synced'})
}

export const setPendingPalettesToSynced = () => {
  return db.palettes.where('status').equals('pendingSync').modify({status: 'synced'})
}