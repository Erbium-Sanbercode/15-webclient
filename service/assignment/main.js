function main(argv) {
  switch (argv[2]) {
    case 'database':
      require('./database/main');
      break;
    case 'worker':
      require('./workers/main');
      break;    
    case 'object':
      require('./object/main');
      break;
    default:
      console.log(argv[2]);
      process.stdout.write('available commmand are \n');
      process.stdout.write('- database\n');
      process.stdout.write('- worker\n');      
      process.stdout.write('- object\n');
      process.stdout.write(':D\n');
  }
}

main(process.argv);
