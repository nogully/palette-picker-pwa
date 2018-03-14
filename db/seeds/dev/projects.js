exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('palettes').del() // delete all palettes first
    .then(() => knex('projects').del()) // delete all projects

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([
        
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('projects').insert({
          name: 'Magic Sparkles' }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'Unicorns', project_id: project[0], 
              color1: '#FFF333',
              color2: '#CCC111', 
              color3: '#C45632', 
              color4: '#345124', 
              color5: '#859208' },
            { name: 'Pandas', project_id: project[0],
              color1: '#FFF333',
              color2: '#CCC111', 
              color3: '#C45632', 
              color4: '#345124', 
              color5: '#859208' }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};