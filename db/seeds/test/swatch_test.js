exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del()) 

    .then(() => {
      return Promise.all([
        
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
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) 
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};