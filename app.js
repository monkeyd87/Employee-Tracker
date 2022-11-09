
const inquirer = require('inquirer')

const prompt = inquirer.createPromptModule()

console.log(`
_______  __   __  _______  ___      _______  __   __  _______  _______ 
|       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
|    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
|   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
|    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
|   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
|_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
__   __  _______  __    _  _______  _______  _______  ______           
|  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |          
|       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||          
|       ||       ||       ||       ||   | __ |   |___ |   |_||_         
|       ||       ||  _    ||       ||   ||  ||    ___||    __  |        
| ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |        
|_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|        
`)
function emplpoyeeManager(){

    prompt([
        {
            type:'list',
            name: 'option',
            message:'What would you like to do?',
            choices:[
                'View all Employees',
                'View all Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee'
            ]
        }
    ]).then(res=>{
        switch(res.option){
            case 'View all Employees':
                console.log('view all')
                emplpoyeeManager()
                break;
    
            case 'View all Employees by Department':
                break;
    
            case 'View All Employees by Manager':
                break;
    
            case  'Add Employee':
                break;
    
            case 'Remove Employee':
                break;
        }
    })
}

emplpoyeeManager()