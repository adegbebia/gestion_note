#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('@TRAORE')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

// program.command('ifnti')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });



program.command('ifnti')
.argument('<String>',"Niveau d'etude (L1,L2,L3)")
        .action((str,options)=>{ 
            console.log(str);
            
            console.log("Bonjour"+str);
            
        });



program.parse();