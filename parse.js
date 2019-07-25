const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'task', title: 'Task'},
    {id: 'completed', title: 'Completed'},
  ]
});

const data = [
  {
    task: 'store data',
    completed: 'todoApp',
  }
];

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));